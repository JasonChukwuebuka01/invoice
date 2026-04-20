import { useState } from 'react';
import iconPlus from '../../assets/invoice-plus-sign.png';
import { useTheme } from '../../context/themeContext';


export default function InvoiceHeader({ count }) {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const { theme, toggleTheme, toggleHambugerMenu, toggleHamburger } = useTheme();

    const statuses = ['Draft', 'Pending', 'Paid'];






    const handleCheckboxChange = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };






    return (
        <header className="flex items-center justify-between mb-8 lg:mb-16">
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Hamburger Menu - Visible only on Mobile/Tablet */}
                <button
                    onClick={() => toggleHambugerMenu(true)}
                    className="flex flex-col gap-[5px] lg:hidden group p-2 -ml-2 outline-none"
                    aria-label="Open navigation menu"
                >
                    <span className="w-6 h-[3px] bg-[#7E88C3] group-hover:bg-purple-main transition-colors rounded-full"></span>
                    <span className="w-6 h-[3px] bg-[#7E88C3] group-hover:bg-purple-main transition-colors rounded-full"></span>
                    <span className="w-6 h-[3px] bg-[#7E88C3] group-hover:bg-purple-main transition-colors rounded-full"></span>
                </button>

                <div>
                    <h1 className="text-2xl lg:text-[36px] font-bold tracking-tight dark:text-white">
                        Invoices
                    </h1>
                    <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[13px]" aria-live="polite">
                        {count === 0 ? "No invoices" : `There are ${count} total invoices`}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-10">
                {/* Filter Dropdown Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsFilterOpen(true)}
                    onMouseLeave={() => setIsFilterOpen(false)}
                >
                    <button
                        className="font-bold text-[13px] dark:text-white flex items-center gap-3 py-2 outline-none focus:text-purple-main"
                        aria-haspopup="listbox"
                        aria-expanded={isFilterOpen}
                    >
                        Filter <span className="hidden sm:inline">by status</span>
                        <svg
                            width="11" height="7" xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path d="M1 1l4.225 4.225L9.45 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" />
                        </svg>
                    </button>

                    {/* The Selection Div */}
                    {isFilterOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[192px] z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="bg-white dark:bg-[#252945] rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_20px_rgba(12,14,22,0.5)] p-6">
                                <ul role="listbox" className="flex flex-col gap-4">
                                    {statuses.map((status) => (
                                        <li key={status} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    id={`status-${status}`}
                                                    checked={selectedStatuses.includes(status)}
                                                    onChange={() => handleCheckboxChange(status)}
                                                    className="peer appearance-none w-4 h-4 bg-[#DFE3FA] dark:bg-[#1E2139] border border-transparent rounded-[2px] cursor-pointer hover:border-purple-main checked:bg-purple-main transition-all"
                                                />
                                                <svg
                                                    width="10" height="8" xmlns="http://www.w3.org/2000/svg"
                                                    className="absolute hidden peer-checked:block pointer-events-none"
                                                >
                                                    <path d="M1.5 4.5l2.5 2.5 4.5-4.5" stroke="#FFF" strokeWidth="2" fill="none" />
                                                </svg>
                                            </div>
                                            <label
                                                htmlFor={`status-${status}`}
                                                className="text-[13px] font-bold dark:text-white cursor-pointer select-none group-hover:text-purple-main transition-colors"
                                            >
                                                {status}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* New Invoice Button */}
                <button
                    className="bg-purple-main hover:bg-purple-hover transition-all pl-2 pr-4 py-2 rounded-full flex items-center gap-4 text-white font-bold text-[13px] shadow-lg shadow-purple-main/20"
                    aria-label="Create new invoice"
                >
                    <img
                        src={iconPlus}
                        alt=""
                        className="w-[30px] h-[30px] object-contain"
                    />
                    <span className="flex gap-1 pr-2">
                        New <span className="hidden sm:inline">Invoice</span>
                    </span>
                </button>
            </div>
        </header>
    );
}