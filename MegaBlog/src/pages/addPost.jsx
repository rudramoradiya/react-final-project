import React from 'react'
import {Container,PostForm} from '../components'

function AddPost() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white py-12">
            <Container>
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Create New Post</h1>
                        <p className="text-sm text-slate-600">Publish a new article with title, image, and content.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
                        <PostForm/>
                    </div>
                </div>
            </Container>
        </div>
        
    )
}

export default AddPost
