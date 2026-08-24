import { useState } from "react";
import { NavLink } from "react-router-dom";

import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";

export default function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("dark-mode");
        return saved ? saved === "true" : false;
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
        localStorage.setItem("dark-mode", String(!darkMode));
    };

    return (
        <div className="bg-white h-screen flex items-center justify-center">

            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    AlphaRook
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                Play chess with friends in real-time
                </p>

                <div className="flex items-center mb-8">
                    <button
                        onClick={toggleDarkMode}
                        className="inline-flex items-center py-1 px-2 rounded-lg ${darkMode ? 'text-gray-400' : 'text-blue-600'} hover:${darkMode ? 'text-gray-500' : 'bg-blue-100'} transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M17.293 13.293a8 8 0 01-1.414-8.485A8.001 8.001 0 006.707 4.707a8.001 8.001 0 011.414 11.485zM7.51 9.99a.75.75 0 00.152-1.038L6.338 7.01a.75.75 0 011.063-.037l3.997 2.898a.75.75 0 001.011-.088l1.496-4.552a.75.75 0 01.698.07L10.77 9.35a.75.75 0 00.128 1.304l-1.495 4.553a.75.75 0 01-.088 1.011l4.25 2.615a.75.75 0 00.07 1.013l-2.896 3.996a.75.75 0 01-.037 1.063l-4.553 1.496a.75.75 0 01-1.038.152l-3.997-2.898a.75.75 0 01-1.038-.088l-4.25-2.615a.75.75 0 00-.07-1.013l2.897-4.00a.75.75 0 01.088-1.293l1.496-4.552a.75.75 0 01-.037-.152l3.997 2.898z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 4.707a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zm-7 4.293a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 110-1.414zm9.9 0a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 110-1.414zm-7-4.293a1 1 0 01-1.414 0L5.707 7.05a1 1 0 110-1.414l1.414-1.414a1 1 0 011.414 1.414zM10 6a1 1 0 012 0v2a1 1 0 11-2 0V6zm-4.293 4.707a1 1 0 01-1.414 0l-1.414 1.414a1 1 0 111.414-1.414l1.414-1.414a1 1 0 110 1.414zM4.293 10a1 1 0 01-1.414 0l-1.414 1.414a1 1 0 111.414 1.414l1.414-1.414a1 1 0 11-1.414-1.414zm4.293 4.707a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414l-1.414-1.414a1 1 0 110-1.414z" />
                            </svg>
                        )}
                    </button>
                    <span className="ml-2 text-sm capitalize">{darkMode ? "Light" : "Dark"} mode</span>
                </div>

                <div className="flex items-center mb-8">
                    <button
                        onClick={toggleSoundTheme}
                        className="inline-flex items-center py-1 px-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                        aria-label="Toggle sound theme"
                    >
                        Sound off
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <NavLink to="/login">
                        <button
                            className="flex-1 rounded bg-gray-200 py-3 px-6 text-base font-medium text-center text-white hover:bg-gray-300 focus:ring-4 focus:ring-primary-300"
                            aria-label="Login"
                        >
                            Login
                        </button>
                    </NavLink>
                    <NavLink to="/game">
                        <button
                            className="flex-1 rounded bg-blue-600 py-3 px-5 text-base font-medium text-center text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                        >
                            Play game
                            <KeyboardTabIcon style={{marginLeft: '8px'}}/>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
};