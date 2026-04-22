import React, { forwardRef } from 'react';

const InvoiceItemInput = forwardRef(({ item, index, handleItemChange, removeItem, errors }, ref) => {
    const total = (item.qty || 0) * (item.price || 0);

    return (
        <fieldset className="grid grid-cols-3 sm:grid-cols-[2.5fr_0.8fr_1.2fr_1fr_auto] gap-x-4 gap-y-6 sm:gap-4 items-end mb-12 sm:mb-4 animate-in fade-in slide-in-from-top-2 duration-300">

            {/* Item Name */}
            <div className="flex flex-col gap-2 col-span-3 sm:col-span-1">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden transition-colors ${errors?.name ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'
                        }`}>
                        Item Name
                    </label>
                    {errors?.name && <span className="text-[#EC5757] text-[10px] font-semibold sm:hidden">{errors.name}</span>}
                </div>
                <input
                    ref={ref}
                    name="name"
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border font-bold text-base sm:text-[13px] outline-none transition-all
                    bg-white dark:bg-[#1E2139] dark:text-white
                    ${errors?.name
                            ? 'border-[#EC5757]'
                            : 'border-[#DFE3FA] dark:border-[#252945] focus:border-purple-main'
                        }`}
                />
            </div>

            {/* Qty */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden ${errors?.qty ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Qty.</label>
                    {errors?.qty && <span className="text-[#EC5757] text-[10px] font-semibold">{errors.qty}</span>}
                </div>
                <input
                    type="number"
                    name="qty"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border font-bold text-base sm:text-[13px] outline-none transition-all
                    bg-white dark:bg-[#1E2139] dark:text-white text-center
                    ${errors?.qty
                            ? 'border-[#EC5757]'
                            : 'border-[#DFE3FA] dark:border-[#252945] focus:border-purple-main'
                        }`}
                />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden ${errors?.price ? 'text-[#EC5757]' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Price</label>
                    {errors?.price && <span className="text-[#EC5757] text-[10px] font-semibold">{errors.price}</span>}
                </div>
                <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border font-bold text-base sm:text-[13px] outline-none transition-all
                    bg-white dark:bg-[#1E2139] dark:text-white
                    ${errors?.price
                            ? 'border-[#EC5757]'
                            : 'border-[#DFE3FA] dark:border-[#252945] focus:border-purple-main'
                        }`}
                />
            </div>

            {/* Total + Delete */}
            <div className="flex items-center justify-between sm:grid sm:grid-cols-[1fr_auto] gap-4 h-full">
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-[#7E88C3] text-[13px] sm:hidden font-medium">Total</label>
                    <div className="p-4 font-bold text-base sm:text-[13px] text-[#888EB0] dark:text-[#DFE3FA] flex items-center h-[52px] transition-colors duration-300">
                        {total.toFixed(2)}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="group flex items-center justify-center h-[52px] transition-all"
                    aria-label="Delete item"
                >
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#888EB0] group-hover:fill-[#EC5757] transition-colors duration-200">
                        <path d="M11.583 3.556v10.667c0 .928-.77 1.678-1.708 1.678H3.125c-.938 0-1.708-.75-1.708-1.678V3.556H11.583zM9.596.889A1.71 1.71 0 0111.167 2.4a1.11 1.11 0 010 .267H1.833a1.11 1.11 0 010-.267A1.71 1.71 0 013.404.889h6.192zM6.5 0C4.013 0 2 1.911 2 4.267V4.267h9V4.267C11 1.911 8.987 0 6.5 0z" fillRule="nonzero" />
                    </svg>
                </button>
            </div>
        </fieldset>
    );
});

InvoiceItemInput.displayName = 'InvoiceItemInput';

export default InvoiceItemInput;