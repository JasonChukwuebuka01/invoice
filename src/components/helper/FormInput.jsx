import React, { forwardRef } from 'react';

export const FormInput = forwardRef(({ label, error, gridClass, ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-2 ${gridClass || ''}`}>
            <div className="flex justify-between items-center">
                <label className={`text-[13px] font-medium transition-colors duration-300 ${error ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'
                    }`}>
                    {label}
                </label>
                {error && (
                    <span className="text-[#EC5757] text-[10px] font-semibold tracking-tight">
                        {error}
                    </span>
                )}
            </div>

            <input
                ref={ref}
                {...props}
                className={`w-full p-4 rounded-md border font-bold text-[13px] outline-none transition-all duration-300
                bg-white text-[#0C0E17] 
                dark:bg-[#1E2139] dark:text-white 
                ${error
                        ? 'border-[#EC5757]'
                        : 'border-[#DFE3FA] dark:border-[#252945] focus:border-[#9277FF] dark:focus:border-[#7C5DFA]'
                    }
                
                /* Date Picker Stylings */
                ${props.type === 'date' ? `
                    cursor-pointer uppercase 
                    scheme-light dark:scheme-dark
                    [&::-webkit-calendar-picker-indicator]:dark:invert
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer
                ` : ''}
                `}
            />
        </div>
    );
});

FormInput.displayName = 'FormInput';