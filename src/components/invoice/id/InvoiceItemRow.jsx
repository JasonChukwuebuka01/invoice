import React from 'react';

function InvoiceItemRow({ name, qty, price }) {
    return (
        <li className="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] items-center">
            {/* Mobile & Desktop Name */}
            <div className="flex flex-col gap-2">
                <span className="text-[#0C0E17] dark:text-white font-bold text-[15px]">{name}</span>
                <span className="md:hidden text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px] uppercase">
                    {qty} x £ {price.toFixed(2)}
                </span>
            </div>

            {/* Desktop Only Columns */}
            <span className="hidden md:block text-center text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px]">{qty}</span>
            <span className="hidden md:block text-right text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px]">£ {price.toFixed(2)}</span>

            {/* Total (Always visible, right aligned) */}
            <span className="text-right text-[#0C0E17] dark:text-white font-bold text-[15px]">£ {(qty * price).toFixed(2)}</span>
        </li>
    );
};


export default InvoiceItemRow;