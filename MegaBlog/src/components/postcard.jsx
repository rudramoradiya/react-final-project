import React, { useState, useEffect } from 'react'
import Service from '../appWrite/confi'
import { Link } from 'react-router-dom'

/**
 * Production-safe image component that never renders <img src="">
 * Conditionally renders image only when valid URL exists
 */
function SafeImage({ fileId, alt, className }) {
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
            console.error("❌ SafeImage - Image failed to load. fileId:", fileId);
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
                <div className="text-slate-400 text-sm">No image available</div>
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

function Postcard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block h-full">
            <div className='w-full h-full border border-slate-200 rounded-2xl p-5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 bg-white hover:border-slate-300 hover:-translate-y-1'>
                <div className='w-full justify-center mb-4 overflow-hidden rounded-xl aspect-[4/3]'>
                    <SafeImage 
                        fileId={featuredImage}
                        alt={title}
                        className='rounded-xl w-full h-full object-cover transition-transform duration-200 hover:scale-105'
                    />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 line-clamp-2">{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard
