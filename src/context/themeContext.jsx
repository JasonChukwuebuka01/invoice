import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const [toggleHamburger, setToggleHamburger] = useState(false);

    useEffect(() => {

        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const toggleHambugerMenu = (value) => {
        setToggleHamburger(value)
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, toggleHambugerMenu, toggleHamburger }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);