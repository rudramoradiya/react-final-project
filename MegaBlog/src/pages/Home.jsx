import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appWrite/confi'
import { Container, Postcard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // Only fetch posts if user is authenticated
        if (authStatus) {
            service.getPosts().then((result) => {
                if (result && result.documents) {
                    setPosts(result.documents)
                }
            }).catch((error) => {
                console.log("Error fetching posts:", error);
                setPosts([]);
            })
        } else {
            // If not authenticated, set empty posts
            setPosts([]);
        }
    }, [authStatus])


    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <Container>
                    <div className="max-w-3xl mx-auto text-center space-y-4 px-4 py-10 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 shadow-sm">
                        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                            {authStatus ? 'No posts available' : 'Login to read posts'}
                        </h1>
                        <p className="text-base md:text-lg text-slate-600">
                            {authStatus ? 'Check back later for new content' : 'Sign in to explore our blog posts'}
                        </p>
                    </div>
                </Container>
            </div>
        )
    }


   return (
        <div className='w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16'>
            <Container>
                <div className="max-w-5xl mx-auto text-center space-y-3 mb-12">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Latest Posts</p>
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Discover fresh stories</h1>
                    <p className="text-base md:text-lg text-slate-600">Insights, updates, and ideas curated for you.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
