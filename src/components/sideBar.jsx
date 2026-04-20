import { useTheme } from '../context/themeContext.jsx';
import invoiceLogo from '../assets/invoice-logo.png';
import profileAvatar from '../assets/profile-avatar.png';

export default function Sidebar() {
    
    const { theme, toggleTheme, toggleHambugerMenu, toggleHamburger } = useTheme();

    return (
        <>
            {/*  Backdrop Overlay (Mobile only) */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 lg:hidden ${toggleHamburger? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => toggleHambugerMenu(false)}
            />


            {/*  Sidebar Component */}
            <aside
                className={`fixed top-0 left-0 z-50 flex flex-col bg-[#1E2139] dark:bg-dark-card transition-transform duration-300 ease-in-out
                    h-screen w-[103px] ${toggleHamburger ? 'translate-x-0' : '-translate-x-full'}
                    lg:w-[103px] lg:translate-x-0 lg:rounded-r-[20px]`
                }
                role="complementary"
            >
                {/* Top Logo Section */}
                <div
                    className="relative flex items-center justify-center bg-purple-main h-[72px] sm:h-[80px] lg:h-[103px] w-full lg:w-[103px]  rounded-r-[20px] overflow-hidden group cursor-pointer"
                >
                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-purple-hover rounded-tl-[20px] transition-all duration-300 group-hover:h-[60%]" />

                    <img
                        src={invoiceLogo}
                        alt="Invoice App Logo"
                        className="relative z-10 h-[50px] w-[50px] lg:h-[60px] lg:w-[60px] object-contain"
                    />
                </div>

                {/* Spacer to push items to bottom */}
                <div className="flex-grow" />

                {/* Bottom Section (Theme Toggle + Avatar) */}
                <div className="flex flex-col items-center w-full">

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-full cursor-pointer py-6 transition-colors outline-none group"
                        aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
                    >
                        <div className='w-1 h-1 rounded-full bg-white'></div>
                      
                    </button>

                    {/* Divider Line */}
                    <div className="h-[1px] w-full bg-[#494E6E]" aria-hidden="true" />

                    {/* Avatar Area */}
                    <div className="flex items-center justify-center w-full py-6 ">
                        <button
                            className="h-8 w-8 lg:h-10 lg:w-10 overflow-hidden rounded-full ring-2 ring-transparent hover:ring-purple-main transition-all outline-none"
                            aria-label="View Profile"
                        >
                            <img
                                src={profileAvatar}
                                alt="User Avatar"
                                className="h-full w-full object-cover"
                            />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}