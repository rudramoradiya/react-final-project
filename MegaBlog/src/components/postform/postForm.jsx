import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteservice from '../../appWrite/confi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Production-safe image preview component that never renders <img src="">
 * Conditionally renders image only when valid URL exists
 */
function FormImagePreview({ fileId, alt }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reset states when fileId changes
        setHasError(false);
        setIsLoading(true);
        
        if (!fileId) {
            setImageUrl(null);
            setIsLoading(false);
            return;
        }

        // Get image URL - returns null on failure
        const url = appwriteservice.getFileView(fileId);
        
        // Only set URL if it's a valid non-empty string
        if (url && typeof url === 'string' && url.trim() !== '') {
            setImageUrl(url);
        } else {
            setImageUrl(null);
        }
        setIsLoading(false);
    }, [fileId]);

    // Handle image load error - prevent infinite loop
    const handleError = (e) => {
        if (!hasError) {
            setHasError(true);
            setImageUrl(null); // Clear invalid URL
            console.error("❌ FormImagePreview - Image failed to load. fileId:", fileId);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-sm">Loading...</div>
            </div>
        );
    }

    // Show error/fallback UI if no valid URL
    if (!imageUrl || hasError) {
        return (
            <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-sm">No preview available</div>
            </div>
        );
    }

    // Only render <img> when we have a valid URL (never empty string)
    return (
        <img
            src={imageUrl}
            alt={alt || ''}
            className="rounded-xl w-full h-48 object-cover shadow-md"
            onError={handleError}
        />
    );
}

function PostForm({ post }) {
    const { register, handleSubmit, setValue, watch, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    // Slug transformation function - converts title to URL-friendly slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-')      // Replace spaces with hyphens
                .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
                .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
        }
        return '';
    }, [])

    // Watch for title changes and auto-generate slug
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    const submit = async (data) => {
        if (post) {
            // Update existing post
            const file = data.image[0] ? await appwriteservice.uploadFile(data.image[0]) : null
            if (file) {
                appwriteservice.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteservice.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // Create new post
            const file = await appwriteservice.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await appwriteservice.createPost({
                    ...data,
                    userId: userData.$id,
                    featuredImage: fileId,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-6">
                <Input
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <Input
                        label="Featured Image :"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && post.featuredImage && (
                        <div className="w-full mt-4">
                            <FormImagePreview 
                                fileId={post.featuredImage}
                                alt={post.title}
                            />
                        </div>
                    )}
                </div>
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full py-3 text-lg hover:shadow-lg">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
