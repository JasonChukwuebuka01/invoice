import React, { forwardRef, useId } from 'react';

export const FormInput = forwardRef(({ label, error, gridClass, ...props }, ref) => {
    // Generate a unique ID if one isn't provided in props
    const defaultId = useId();
    const inputId = props.id || defaultId;
    const errorId = `${inputId}-error`;

    return (
        <div className={`flex flex-col gap-2 ${gridClass || ''}`}>
            <div className="flex justify-between items-center">
                <label
                    htmlFor={inputId}
                    className={`text-[13px] font-medium transition-colors duration-300 ${error ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'
                        }`}
                >
                    {label}
                </label>
                {error && (
                    <span
                        id={errorId}
                        className="text-[#EC5757] text-[10px] font-semibold tracking-tight"
                        aria-live="polite"
                    >
                        {error}
                    </span>
                )}
            </div>

            <input
                id={inputId}
                ref={ref}
                {...props}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                className={`w-full p-4 rounded-md border font-bold text-[13px] outline-none transition-all duration-300
                bg-white text-[#0C0E17] 
                dark:bg-[#1E2139] dark:text-white 
                color-scheme-light dark:color-scheme-dark
                ${error
                        ? 'border-[#EC5757]'
                        : 'border-[#DFE3FA] dark:border-[#252945] focus:border-[#9277FF] dark:focus:border-[#7C5DFA]'
                    }
                
                /* Date Picker Stylings */
                ${props.type === 'date' ? `
                    cursor-pointer uppercase 
                    [&::-webkit-calendar-picker-indicator]:dark:invert
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer
                ` : ''}
                `}
            />
        </div>
    );
});

FormInput.displayName = 'FormInput';