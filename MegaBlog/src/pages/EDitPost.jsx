import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, PostForm } from '../components'
import service from '../appWrite/confi'

function EDitPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            // Fixed: getpost -> getPost (case-sensitive)
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate('/');
                    }
                })
                .catch((error) => {
                    console.error("Error loading post:", error);
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white py-12">
            <Container>
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Edit Post</h1>
                        <p className="text-sm text-slate-600">Update your post details and content below.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
                        <PostForm post={post} />
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

export default EDitPost
