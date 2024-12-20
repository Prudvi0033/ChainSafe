import React from 'react'

const Input = ({ label, placeholder }) => {
    return (
        <div className="w-full max-w-sm min-w-[200px] mb-4">
            <label className="block mb-2 text-sm text-white font-semibold">
                {label}
            </label>
            <input className="w-full bg-transparent placeholder:text-slate-400 text-white font-thin tracking-wider text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} />
        </div>
    )
}

export default Input