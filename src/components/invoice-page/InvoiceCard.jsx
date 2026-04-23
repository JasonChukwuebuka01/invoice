import React from 'react';
import arrowRight from '../../assets/arrow-copy.png';

export default function InvoiceCard({ invoice }) {
    const statusStyles = {
        paid: "bg-[#33d69f0f] text-[#33D69F]",
        pending: "bg-[#ff8f000f] text-[#FF8F00]",
        draft: "bg-[#dfe3fa0f] text-[#373B53] dark:text-[#DFE3FA]",
    };

    const dotStyles = {
        paid: "bg-[#33D69F]",
        pending: "bg-[#FF8F00]",
        draft: "bg-[#373B53] dark:bg-[#DFE3FA]",
    };

    return (
        <article
            className="group grid grid-cols-2 sm:grid-cols-[80px_150px_1fr_auto_140px_auto] items-center bg-[#F8F8FB] dark:bg-[#1E2139] p-6 sm:py-4 sm:px-8 rounded-lg shadow-sm mb-4 border border-transparent hover:border-[#7C5DFA] transition-all duration-300 cursor-pointer outline-none"
            tabIndex="0"
        >
            {/* -ID (Top Left Mobile / Far Left Desktop) --- */}
            <span className="font-bold text-[12px] md:text-[15px] text-[#0C0E17] dark:text-white uppercase">
                <span className="text-[#7E88C3]">#</span>{invoice.id}
            </span>

            {/* - Desktop Due Date (Hidden on Mobile) --- */}
            <span className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] hidden sm:block">
                Due {invoice.invoiceDate}
            </span>

            {/* -Client Name (Top Right Mobile / Middle Desktop) --- */}
            <span className="text-[13px] text-[#858BB2] dark:text-[#DFE3FA] text-right sm:text-left">
                {invoice.clientName}
            </span>

            {/* -- Mobile Due Date & Amount (Bottom Left Mobile / Hidden Desktop) --- */}
            {/* This div is now explicitly forced to show on mobile */}
            <div className="mt-6 sm:hidden flex flex-col gap-2">
                <span className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA]">
                    Due {invoice.invoiceDate}
                </span>
                <span className="text-base font-bold text-[#0C0E17] dark:text-white">
                    £ {invoice.total?.toLocaleString()}
                </span>
            </div>

            {/* - Desktop Amount (Hidden on Mobile) --- */}
            <span className="hidden sm:block text-[16px] md:text-[20px] font-bold text-[#0C0E17] dark:text-white text-right pr-10">
                £ {invoice.total?.toLocaleString()}
            </span>

            {/* --Status Badge (Bottom Right Mobile / Far Right Desktop) --- */}
            <div className="flex items-center justify-end mt-6 sm:mt-0">
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