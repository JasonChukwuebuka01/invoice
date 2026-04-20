import { useTheme } from '../context/themeContext.jsx';
import invoiceLogo from '../assets/invoice-logo.png';



export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="fixed top-0 left-0 z-50 flex w-full h-screen flex-row items-center justify-between bg-[#373B53] dark:bg-dark-card sm:h-[80px] lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-[20px]">

            {/* Top Logo Section */}
            <div className="relative flex h-full w-[72px] items-center justify-center rounded-r-[20px] bg-purple-main sm:w-[80px] lg:h-[103px] lg:w-full">
                {/* Lighter purple curved overlay at the bottom */}
                <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-tl-[20px] bg-purple-hover"></div>

                <img
                    src={invoiceLogo}
                    alt="Invoice App Logo"
                    className="relative z-10 h-[26px] w-[28px] lg:h-[31px] lg:w-[31px] object-contain"
                />
            </div>

            {/* Bottom Section (Theme Toggle + Avatar) */}
            <div className="flex h-full flex-row items-center lg:h-auto lg:w-full lg:flex-col">

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex h-full items-center px-6 transition-colors hover:text-white lg:h-auto lg:py-8 lg:px-0"
                >
                    {theme === 'light' ? (
                        /* Moon Icon */
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.192-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.65.65 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.471-.851z" fill="#858BB2" fillRule="nonzero" className="hover:fill-white transition-all" /></svg>
                    ) : (
                        /* Sun Icon */
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.81 17.061c-3.974 0-7.194-3.23-7.194-7.215 0-3.986 3.22-7.215 7.193-7.215 3.974 0 7.194 3.229 7.194 7.215 0 3.985-3.22 7.215-7.194 7.215zm0-2.316c2.705 0 4.898-2.198 4.898-4.899 0-2.701-2.193-4.899-4.898-4.899-2.704 0-4.898 2.198-4.898 4.899 0 2.701 2.194 4.899 4.898 4.899zm-4.708-4.88h-2.91v-.039h2.91v.039zm12.33 0h-2.91v-.039h2.91v.039zM9.825 5.093V2.187h-.04v2.906h.04zm0 12.31V20.31h-.04v-2.906h.04z" fill="#858BB2" fillRule="nonzero" className="hover:fill-white transition-all" /></svg>
                    )}
                </button>

                {/* Divider Line */}
                <div className="h-full w-[1px] bg-[#494E6E] lg:h-[1px] lg:w-full"></div>

                {/* Avatar Area */}
                <div className="flex items-center px-6 lg:py-6 lg:px-0">
                    <div className="h-8 w-8 overflow-hidden rounded-full lg:h-10 lg:w-10">
                        {/* If you have the real avatar image in src/assets, use that. Otherwise, this placeholder perfectly matches the size */}
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                            alt="User Avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </aside>
    );
}