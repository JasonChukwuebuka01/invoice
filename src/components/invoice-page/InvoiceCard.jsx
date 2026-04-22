import React from 'react';
import arrowRight from '../../assets/arrow-copy.png';

export default function InvoiceCard({ invoice }) {
    // These styles handle the opacity and color of the status badge
    const statusStyles = {
        paid: "bg-[#33d69f0f] text-[#33D69F]",
        pending: "bg-[#ff8f000f] text-[#FF8F00]",
        // Draft color shifts from dark navy in light mode to light gray in dark mode
        draft: "bg-[#dfe3fa0f] text-[#373B53] dark:text-[#DFE3FA]",
    };

    const dotStyles = {
        paid: "bg-[#33D69F]",
        pending: "bg-[#FF8F00]",
        draft: "bg-[#373B53] dark:bg-[#DFE3FA]",
    };

    return (
        <article
            className="group grid grid-cols-2 sm:grid-cols-[auto_1fr_1fr_1fr_auto] sm:items-center bg-white dark:bg-[#1E2139] p-6 sm:py-4 sm:px-8 rounded-lg shadow-sm mb-4 border border-transparent hover:border-[#7C5DFA] transition-all duration-300 cursor-pointer outline-none"
            tabIndex="0"
        >
            {/* --- ID Section --- */}
            <span className="font-bold text-[12px] md:text-[15px] text-[#0C0E17] dark:text-white uppercase mb-6 sm:mb-0">
                <span className="text-[#7E88C3]">#</span>{invoice.id}
            </span>

            {/* --- Client Name --- */}
            <span className="text-[13px] text-[#858BB2] dark:text-[#DFE3FA] text-right sm:text-left mb-6 sm:mb-0 sm:pl-4">
                {invoice.clientName}
            </span>

            {/* --- Date Section --- */}
            <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">
                    <span className="sm:hidden">Due </span>{invoice.paymentDue}
                </span>
            </div>

            {/* --- Amount --- */}
            <span className="text-base md:text-[20px] font-bold text-[#0C0E17] dark:text-white mt-2 sm:mt-0 sm:text-right sm:pr-10">
                £ {invoice.total}
            </span>

            {/* --- Status & Arrow --- */}
            <div className="flex items-center justify-end col-start-2 row-start-2 sm:col-start-auto sm:row-start-auto">
                <div className={`w-[104px] h-[40px] rounded-md flex items-center justify-center gap-2 font-bold capitalize text-[15px] ${statusStyles[invoice.status]}`}>
                    <div
                        className={`w-2 h-2 rounded-full ${dotStyles[invoice.status]}`}
                        aria-hidden="true"
                    />
                    {invoice.status}
                </div>

                <img
                    src={arrowRight}
                    alt=""
                    className="hidden sm:block ml-5 w-[7px] h-[10px]"
                />
            </div>
        </article>
    );
}