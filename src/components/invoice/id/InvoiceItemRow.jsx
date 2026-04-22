import React from 'react';

function InvoiceItemRow({ name, qty, price }) {
    return (
        <li className="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] items-center transition-colors duration-300">
            {/* Name & Mobile Details */}
            <div className="flex flex-col gap-2">
                {/* Item Name: Deep black in light mode, Pure white in dark mode */}
                <span className="text-[#0C0E17] dark:text-white font-bold text-[15px]">
                    {name}
                </span>
                {/* Mobile-only Price Calculation */}
                <span className="md:hidden text-[#7E88C3] dark:text-[#888EB0] font-bold text-[15px]">
                    {qty} x £ {price.toFixed(2)}
                </span>
            </div>

            {/* Desktop Only: Quantity */}
            <span className="hidden md:block text-center text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px]">
                {qty}
            </span>

            {/* Desktop Only: Unit Price */}
            <span className="hidden md:block text-right text-[#7E88C3] dark:text-[#DFE3FA] font-bold text-[15px]">
                £ {price.toFixed(2)}
            </span>

            {/* Total: Bolded and high contrast */}
            <span className="text-right text-[#0C0E17] dark:text-white font-bold text-[15px]">
                £ {(qty * price).toFixed(2)}
            </span>
        </li>
    );
};

export default InvoiceItemRow;