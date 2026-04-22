import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Added this
import iconPlus from '../../assets/invoice-plus-sign.png';
import { useTheme } from '../../context/themeContext';
import FormComponent from './FormComponent';


export default function InvoiceHeader({ count }) {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { theme } = useTheme();

    // 1. Hook to read and write URL parameters
    const [searchParams, setSearchParams] = useSearchParams();

    // 2. Get the current statuses from URL (e.g., "paid,pending") or an empty string
    const currentStatuses = searchParams.get('status')?.split(',') || [];

    const statuses = ['All', 'Draft', 'Pending', 'Paid'];

    //  Set UrL :The Logic Handler
    const handleStatusChange = (status) => {
        if (status === 'All') {
            // Clicking "All" clears the filter completely
            searchParams.delete('status');
        } else {
            const lowerStatus = status.toLowerCase();
            let newStatuses = [...currentStatuses];

            if (newStatuses.includes(lowerStatus)) {
                // If already there, remove it (uncheck)
                newStatuses = newStatuses.filter(s => s !== lowerStatus);
            } else {
                // If not there, add it (check)
                newStatuses.push(lowerStatus);
            }

            // Update URL: If array is empty, delete the key for a clean URL
            if (newStatuses.length === 0) {
                searchParams.delete('status');
            } else {
                searchParams.set('status', newStatuses.join(','));
            }
        };
        setSearchParams(searchParams);
    };

    return (
        <header className="flex items-center justify-between mb-8 lg:mb-16">
            <div className="flex items-center gap-4 sm:gap-6">
                <div>
                    <h1 className="text-2xl lg:text-[36px] font-bold tracking-tight dark:text-white">Invoices</h1>
                    <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[13px]">
                        {count === 0 ? "No invoices" : `There are ${count} total invoices`}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-10">
                <div
                    className="relative"
                    onMouseEnter={() => setIsFilterOpen(true)}
                    onMouseLeave={() => setIsFilterOpen(false)}
                >
                    <button className="font-bold text-[13px] dark:text-white flex items-center gap-3 py-2 outline-none">
                        Filter <span className="hidden sm:inline">by status</span>
                        <svg width="11" height="7" className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
                            <path d="M1 1l4.225 4.225L9.45 1" stroke="#7C5DFA" strokeWidth="2" fill="none" />
                        </svg>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[192px] z-40">
                            <div className="bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6">
                                {statuses.map(s => (
                                    <label key={s} className="flex items-center gap-3 mb-4 last:mb-0 cursor-pointer group font-bold text-[13px] dark:text-white">
                                        <input
                                            type="checkbox"
                                            className="accent-purple-main w-4 h-4 cursor-pointer"
                                            // 4. "Controlled" checked state based on URL
                                            checked={s === 'All' ? currentStatuses.length === 0 : currentStatuses.includes(s.toLowerCase())}
                                            onChange={() => handleStatusChange(s)}
                                        />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={() => setIsFormOpen(true)} className="bg-purple-main hover:bg-purple-hover transition-all pl-2 pr-4 py-2 rounded-full flex items-center gap-4 text-white font-bold text-[13px] shadow-lg shadow-purple-main/20">
                    <img src={iconPlus} alt="" className="w-[30px] h-[30px]" />
                    <span>New <span className="hidden sm:inline">Invoice</span></span>
                </button>
            </div>

            {/* SLIDING FORM DRAWERS SECTION */}
            <div className={`fixed inset-0 z-[60] transition-opacity duration-500 ${isFormOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/50 lg:left-[103px]" onClick={() => setIsFormOpen(false)}></div>
                <section className={`absolute top-0 bottom-0 left-0 lg:left-[103px] w-full max-w-[719px] bg-white dark:bg-[#141625] overflow-y-auto p-8 md:p-14 md:rounded-r-[20px] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isFormOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <h2 className="text-2xl font-bold dark:text-white mb-14">New Invoice</h2>
                    <FormComponent setIsFormOpen={setIsFormOpen} />
                </section>
            </div>
        </header>
    );
}