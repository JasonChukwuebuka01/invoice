import React, { forwardRef } from 'react';




const InvoiceItemInput = forwardRef(({ item, index, handleItemChange, removeItem, errors }, ref) => {
    const total = (item.qty || 0) * (item.price || 0);

    return (
        <fieldset className="grid grid-cols-3 sm:grid-cols-[2fr_1fr_1.5fr_1fr_auto] gap-x-4 gap-y-6 sm:gap-4 items-end mb-12 sm:mb-4 animate-in fade-in duration-300">

            {/* Item Name */}
            <div className="flex flex-col gap-2 col-span-3 sm:col-span-1">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden ${errors?.name ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>
                        Item Name
                    </label>
                    {errors?.name && <span className="text-red-500 text-[10px] font-semibold sm:hidden">{errors.name}</span>}
                </div>
                <input
                    ref={ref} // Attached ref here for auto-focus
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-base sm:text-[13px] outline-none focus:border-purple-main transition-colors ${errors?.name ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`}
                />
            </div>

            {/* Qty */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden ${errors?.qty ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Qty.</label>
                    {errors?.qty && <span className="text-red-500 text-[10px] font-semibold ">{errors.qty}</span>}
                </div>
                <input
                    type="number"
                    name="qty"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-base sm:text-[13px] focus:border-purple-main outline-none transition-colors ${errors?.qty ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`}
                />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <label className={`text-[13px] font-medium sm:hidden ${errors?.price ? 'text-red-500' : 'text-[#7E88C3] dark:text-[#DFE3FA]'}`}>Price</label>
                    {errors?.price && <span className="text-red-500 text-[10px] font-semibold ">{errors.price}</span>}
                </div>
                <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full p-4 rounded-md border bg-transparent dark:text-white font-bold text-base sm:text-[13px] focus:border-purple-main outline-none transition-colors ${errors?.price ? 'border-red-500' : 'border-[#DFE3FA] dark:border-[#252945]'}`}
                />
            </div>

            {/* Total + Delete */}
            <div className="flex items-center justify-between sm:grid sm:grid-cols-[1fr_auto] gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-[#7E88C3] text-[13px] sm:hidden font-medium">Total</label>
                    <div className="p-4 dark:text-[#DFE3FA] font-bold text-base sm:text-[13px] text-[#888EB0] flex items-center h-[50px] sm:h-auto">
                        £{total.toFixed(2)}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="pt-6 sm:pt-0 group self-end mb-2 sm:mb-0"
                >
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" className="fill-[#888EB0] group-hover:fill-red-500 transition-colors">
                        <path d="M11.583 3.556v10.667c0 .928-.77 1.678-1.708 1.678H3.125c-.938 0-1.708-.75-1.708-1.678V3.556H11.583zM9.596.889A1.71 1.71 0 0111.167 2.4a1.11 1.11 0 010 .267H1.833a1.11 1.11 0 010-.267A1.71 1.71 0 013.404.889h6.192zM6.5 0C4.013 0 2 1.911 2 4.267V4.267h9V4.267C11 1.911 8.987 0 6.5 0z" fillRule="nonzero" />
                    </svg>
                </button>
            </div>
        </fieldset>
    );
});

export default InvoiceItemInput;