import { useTheme } from '../context/themeContext.jsx';
import invoiceLogo from '../assets/invoice-logo.png';
import profileAvatar from '../assets/profile-avatar.png';

export default function Sidebar() {


    const { theme, toggleTheme } = useTheme();



    return (
        <aside
            className="fixed top-0 left-0 z-500  flex flex-row lg:flex-col bg-[#373B53] dark:bg-[#1E2139] w-full h-[72px] md:h-[80px] lg:h-screen lg:w-[103px] transition-all duration-300 items-center justify-between overflow-hidden"
            role="complementary"
        >
            {/* Logo Section */}
            <div className="relative flex items-center justify-center bg-purple-main h-full w-[72px] md:w-[80px] lg:h-[103px] lg:w-full rounded-r-[20px] overflow-hidden group cursor-pointer">
                <div className="absolute bottom-0 left-0 h-1/2 w-full bg-purple-hover rounded-tl-[20px] transition-all duration-300 group-hover:h-[60%]" />

                <img
                    src={invoiceLogo}
                    alt="Logo"
                    className="relative z-10 h-[45px] w-[45px] lg:h-[60px] lg:w-[60px] object-contain"
                />
            </div>

            {/* Controls Section */}
            <div className="flex flex-row lg:flex-col items-center h-full lg:h-auto lg:w-full">

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center px-6 md:px-7 lg:px-0 lg:py-8 cursor-pointer transition-colors outline-none group"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {/* The Circle Indicator */}
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 transform group-hover:scale-125
        ${theme === 'light'
                                ? 'bg-[#7E88C3] shadow-[0_0_8px_rgba(126,136,195,0.4)]' // Soft blue-gray for light mode
                                : 'bg-[#7C5DFA] shadow-[0_0_12px_rgba(124,93,250,0.6)]'  // Glowing brand purple for dark mode
                            }`}
                    />
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