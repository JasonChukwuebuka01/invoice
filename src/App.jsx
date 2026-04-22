import { Outlet } from 'react-router-dom';
import Sidebar from './components/sideBar';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference on initial load
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Effect to sync the 'dark' class with the state
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // We apply the theme background to the very top container
    <div className="flex h-screen w-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 font-spartan">
      
      {/* Pass the toggle function and current state to Sidebar so your button can use them */}
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* Changed bg-[#141625] to responsive classes. 
          Using dark:bg-pages-color for that deep navy look in dark mode.
      */}
      <main className="flex-1 h-screen bg-light-bg dark:bg-pages-color p-3 lg:pl-[7%] overflow-x-hidden transition-colors duration-300">
        <section className='lg:h-screen flex justify-center'>
          <Outlet context={{ isDarkMode }} />
        </section>
      </main>
    </div>
  );
}

export default App;