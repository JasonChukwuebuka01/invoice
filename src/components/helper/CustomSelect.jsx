import React, { useState } from 'react';

export const CustomSelect = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);





    const selectedOption = options.find(opt => opt.value === value);



    const handleSelect = (optionValue) => {
        onChange({ target: { name: 'paymentTerms', value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 relative">

            {/* Trigger Button */}
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-[13px] cursor-pointer flex justify-between items-center transition-all outline-none 
                ${isOpen ? 'border-purple-main' : 'border-[#DFE3FA] dark:border-[#252945] hover:border-purple-main'}`}
            >
                {selectedOption ? selectedOption.label : 'Select Terms'}
                <svg
                    width="11" height="7"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1 1l4.225 4.225L9.45 1" stroke="#7C5DFA" strokeWidth="2" fill="none" />
                </svg>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-white dark:bg-[#252945] shadow-2xl rounded-lg z-50 overflow-hidden border border-transparent">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="p-4 text-[13px] font-bold text-[#1E2139] dark:text-[#DFE3FA] cursor-pointer border-b border-[#DFE3FA] dark:border-[#1E2139] last:border-0 hover:text-purple-main hover:bg-purple-main  hover:text-white transition-colors bg-white dark:bg-[#1E2139]"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

