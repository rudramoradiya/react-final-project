import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // If route requires authentication and user is not authenticated, redirect to login
        if (authentication && !authStatus) {
            navigate('/login')
        } 
        // If route requires no authentication (like login/signup) and user is authenticated, redirect to home
        else if (!authentication && authStatus) {
            navigate('/home')
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-500 mb-4"></div>
                <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>
            </div>
        </div>
    ) : <>{children}</>
}

