import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-indigo-600',
    textColor='text-white',
    padding='px-6 py-2.5',
    classname='',
    ...props
}) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-lg font-semibold ${padding} ${textColor} ${bgColor} ${classname} transition-all duration-200 hover:scale-[1.01] hover:shadow-md hover:bg-indigo-500 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100`}
            {...props}
        >{children}</button>
    )
}

export default Button
