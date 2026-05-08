import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return JSON.parse(localStorage.getItem("theme")) || false;
    });

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));

        if (theme) {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        } else {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);