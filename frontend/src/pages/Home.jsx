import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";

export default function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("dark-mode");
        return saved ? saved === "true" : false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("dark-mode", String(next));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">

            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    AlphaRook
                </h1>
                <p className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl sm:px-16 xl:px-48">
                    Play chess with friends in real-time
                </p>

                <div className="flex items-center justify-center mb-10">
                    <button
                        onClick={toggleDarkMode}
                        className={`inline-flex items-center gap-2 py-2 px-4 rounded-full border transition-colors ${
                            darkMode
                                ? "border-gray-600 text-amber-300 hover:bg-gray-800"
                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                            </svg>
                        )}
                        <span className="text-sm">{darkMode ? "Light" : "Dark"} mode</span>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <NavLink to="/game" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors">
                            Play game
                            <KeyboardTabIcon style={{ marginLeft: "8px" }} />
                        </button>
                    </NavLink>
                    <NavLink to="/login" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors">
                            Login
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
};