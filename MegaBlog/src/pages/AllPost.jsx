import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Postcard } from '../components'
import service from '../appWrite/confi'

function AllPost() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // Only fetch posts if user is authenticated
        if (authStatus) {
            service.getPosts().then((result) => {
                if (result && result.documents) {
                    setPosts(result.documents)
                } else {
                    setPosts([])
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
            <div className="py-16 w-full bg-slate-50">
                <Container>
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h1 className="text-3xl font-semibold text-slate-900">
                            {authStatus ? 'No posts available' : 'Please login to view posts'}
                        </h1>
                        <p className="text-slate-600 text-lg">
                            {authStatus ? 'Check back later for new content' : 'Sign in to explore our blog posts'}
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="py-12 w-full bg-slate-50">
            <Container>
                <h1 className="text-3xl font-semibold text-slate-900 mb-8">All Posts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default AllPost
