import React from 'react'
import { useId } from 'react'

const Input=React.forwardRef(function Input({
    type='text',
    label, 
    classname='',
    ...props
},ref){
    const id=useId();

    return (
        // <input type={type} placeholder={placeholder} className={`w-full border border-gray-300 focus:border-blue-500 rounded-lg px-4 py-2 outline-none ${classname}`} ref={ref} {...props}/>
        <>
        <div className="w-full">
            {
                label && <label className='inline-block mb-2 pl-1 text-sm font-medium text-slate-800'
                htmlFor={id}>{label}</label>
            }
            <input
            type={type}
            className={`px-4 py-3 rounded-xl bg-white text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 transition-all duration-200 border border-slate-200 w-full placeholder:text-slate-400 ${classname}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
        </>
    )
})
export default Input

