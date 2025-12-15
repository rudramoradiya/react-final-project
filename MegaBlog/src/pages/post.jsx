import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../appWrite/confi";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

/**
 * Production-safe image component that never renders <img src="">
 * Conditionally renders image only when valid URL exists
 */
function PostImage({ fileId, alt, className }) {
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
        const url = Service.getFileView(fileId);
        
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
            console.error("❌ PostImage - Image failed to load. fileId:", fileId);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-lg">Loading image...</div>
            </div>
        );
    }

    // Show error/fallback UI if no valid URL
    if (!imageUrl || hasError) {
        return (
            <div className="w-full h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-lg">No image available</div>
            </div>
        );
    }

    // Only render <img> when we have a valid URL (never empty string)
    return (
        <img
            src={imageUrl}
            alt={alt || ''}
            className={className}
            onError={handleError}
            loading="lazy"
        />
    );
}

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const authLoading = useSelector((state) => state.auth.loading);

    const isAuthor = !authLoading && post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (!post || authLoading) {
        return null;
    }

    return (
        <div className="py-12 bg-slate-50">
            <Container>
                <article className="max-w-4xl mx-auto">
                    <div className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden shadow-md">
                        <PostImage 
                            fileId={post.featuredImage}
                            alt={post.title}
                            className="rounded-xl w-full max-h-[500px] object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg hover:bg-green-600">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="shadow-lg hover:bg-red-600" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 leading-tight">{post.title}</h1>
                    </div>
                    <div className="browser-css prose prose-lg max-w-none">
                        {parse(post.content)}
                    </div>
                </article>
            </Container>
        </div>
    ) 
}
