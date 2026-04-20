import arrowRight from '../../assets/arrow-copy.png';

export default function InvoiceCard({ invoice }) {
    const statusStyles = {
        paid: "bg-[#33d69f0f] text-status-paid",
        pending: "bg-[#ff8f000f] text-status-pending",
        draft: "bg-[#373b530f] text-status-draft dark:text-[#DFE3FA]",
    };

    const dotStyles = {
        paid: "bg-status-paid",
        pending: "bg-status-pending",
        draft: "bg-[#373b53] dark:bg-[#DFE3FA]",
    };

    return (
        <article
            className="group grid grid-cols-2 sm:flex sm:items-center sm:justify-between bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm mb-4 border border-transparent hover:border-purple-main transition-all cursor-pointer focus-within:ring-2 focus-within:ring-purple-main outline-none"
            tabIndex="0"
        >
            {/* Top Left: ID & Bottom Left: Date (Mobile) / Sequential (Desktop) */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6 lg:gap-12">
                <span className="font-bold text-[13px] dark:text-white uppercase order-1">
                    <span className="text-[#7E88C3]">#</span>{invoice.id}
                </span>
                
                <span className="text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] order-3 sm:order-2">
                    <span className="sm:hidden">Due </span>{invoice.paymentDue}
                </span>
            </div>

            {/* Top Right: Client Name (Mobile) / Sequential (Desktop) */}
            <div className="text-right sm:text-left order-2 sm:order-3">
                <span className="text-[13px] text-[#858BB2] dark:text-white">
                    {invoice.clientName}
                </span>
            </div>

            {/* Bottom Section (Mobile) / Right Section (Desktop) */}
            <div className="flex items-center justify-between col-span-2 mt-2 sm:mt-0 sm:col-span-1 sm:order-4 sm:gap-8 lg:gap-10">
                <span className="text-base font-bold dark:text-white lg:text-lg">
                    £{invoice.total}
                </span>

                <div className="flex items-center gap-4">
                    {/* Status Pill */}
                    <div className={`w-[104px] h-[40px] rounded-md flex items-center justify-center gap-2 font-bold capitalize text-[13px] ${statusStyles[invoice.status]}`}>
                        <div 
                            className={`w-2 h-2 rounded-full ${dotStyles[invoice.status]}`} 
                            aria-hidden="true" 
                        />
                        <p aria-label='invoice-status'>{invoice.status}</p>
                    </div>

                    {/* Arrow - Hidden on mobile, visible on desktop */}
                    <img
                        src={arrowRight}
                        alt=""
                        aria-hidden="true"
                        className="hidden sm:block w-[4px] h-[8px] object-contain"
                    />
                </div>
            </div>
        </article>
    );
}