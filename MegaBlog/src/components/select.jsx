import React, { use, useId } from 'react'

function Select({
    options,
    label,
    classname,
    ...props
}, ref) {
    const id =useId()
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-800">{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-slate-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 duration-200 border border-slate-200 w-full ${classname}`}
            >
                {options?.map((option)=>(
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)