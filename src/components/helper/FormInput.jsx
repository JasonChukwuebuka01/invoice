import React, { forwardRef } from 'react';

export const FormInput = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-2 ${props.gridClass || ''}`}>
            <div className="flex justify-between items-center">
                <label className="text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]">
                    {label}
                </label>
                {error && <span className="text-[#EC5757] text-[10px] font-bold">{error}</span>}
            </div>
            <input
                ref={ref} // Attach the ref here!
                {...props}
                className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] outline-none focus:border-purple-main transition-colors ${error ? 'border-[#EC5757]' : 'border-[#DFE3FA] dark:border-[#252945]'
                    }`}
            />
        </div>
    );
});