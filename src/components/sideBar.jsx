import { useTheme } from '../context/themeContext.jsx';
import invoiceLogo from '../assets/invoice-logo.png';
import profileAvatar from '../assets/profile-avatar.png';

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside
            // FIX: Design uses a darker BG (#373B53) in Light mode for contrast, but stays dark.
            className="fixed top-0 left-0 z-500 flex flex-row lg:flex-col bg-[#373B53] dark:bg-[#1E2139] w-full h-[72px] md:h-[80px] lg:h-screen lg:w-[103px] transition-all duration-300 items-center justify-between overflow-hidden"
            role="complementary"
        >
            {/* Logo Section */}
            <div className="relative flex items-center justify-center bg-purple-main h-full w-[72px] md:w-[80px] lg:h-[103px] lg:w-full rounded-r-[20px] overflow-hidden group cursor-pointer">
                <div className="absolute bottom-0 left-0 h-1/2 w-full bg-purple-hover rounded-tl-[20px] transition-all duration-300 group-hover:h-[60%]" />

                <img
                    src={invoiceLogo}
                    alt="Logo"
                    className="relative z-10 h-[26px] w-[28px] lg:h-[40px] lg:w-[40px] object-contain"
                />
            </div>

            {/* Controls Section */}
            <div className="flex flex-row lg:flex-col items-center h-full lg:h-auto lg:w-full">

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center px-6 md:px-7 lg:px-0 lg:py-8 cursor-pointer transition-colors outline-none group"
                    // UX: Aria-label tells screen readers what the *next* action is.
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? (
                        /* Moon Icon - Visible when app is in LIGHT mode */
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="fill-[#7E88C3] hover:fill-[#DFE3FA] transition-colors"><path d="M6.224 4.903A8.103 8.103 0 0115.097 13.78a8.103 8.103 0 10-8.873-8.877z" fillRule="nonzero" /></svg>
                    ) : (
                        /* Sun Icon - Visible when app is in DARK mode */
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="fill-[#858BB2] hover:fill-[#DFE3FA] transition-colors"><path d="M10 15a5 5 0 100-10 5 5 0 000 10zM10 0V2.5M10 17.5V20M3 3l1.768 1.768M15.232 15.232L17 17M0 10h2.5M17.5 10H20M3 17l1.768-1.768M15.232 4.768L17 3" stroke="#858BB2" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                    )}
                </button>

                {/* Divider Line */}
                <div className="w-[1px] h-full lg:h-[1px] lg:w-full bg-[#494E6E]" aria-hidden="true" />

                {/* Avatar Area */}
                <div className="flex items-center justify-center px-6 lg:px-0 lg:py-6">
                    <img
                        src={profileAvatar}
                        alt="User Avatar"
                        // UX: Add hover border color to match interactive elements
                        className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-transparent hover:border-purple-main transition-all cursor-pointer"
                    />
                </div>
            </div>
        </aside>
    );
}