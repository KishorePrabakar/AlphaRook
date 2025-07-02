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
        localStorage.setItem("dark-mode", !darkMode);
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
                <div className="flex items-center mb-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`inline-flex items-center py-1 px-2 rounded-lg ${darkMode ? 'text-gray-400' : 'text-blue-600'} hover:${darkMode ? 'text-gray-500' : 'bg-blue-100'} transition-colors`}
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
                <div className="flex items-center mb-4">
                    <NavLink to="/login">
                        <button
                            className="ml-2 inline-flex items-center py-1 px-2 rounded-lg text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            aria-label="Login"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 5h6a2 2 0 012 2v3m-2-6l3-3m-3 3h-6m-6-6h6m3-3l-3 3m0 9a3 3 0 110-6 3 3 0 010 6zm11.32-3.622a7.965 7.965 0 01-.373 1.311c-.164.608-.386 1.334-.615 1.994-.228.66-.484 1.391-.779 2.144-.295.753-.614 1.467-.974 2.116-.36.651-.753 1.224-1.171 1.72-.417.496-.87.973-1.346 1.37a8.44 8.44 0 00-.261.089 8.436 8.436 0 01-.722.41 4.52 4.52 0 00-1.533.188 4.091 4.091 0 00-2.067-.075 4.701 4.701 0 00-2.355-.421 4.532 4.532 0 00-1.658-.55 3.818 3.818 0 00-1.295-.827 3.43 3.43 0 00-.727-1.243A11.955 11.955 0 0018 10a11.954 11.954 0 00-3.195 1.05 3.564 3.564 0 01-1.898-.305 3.218 3.218 0 00-.77-1.122c-.177-.397-.378-.83-.597-1.233a13.937 13.937 0 00-.46-.857 2.179 2.179 0 01-.317-1.089l-.005-.013ZM14.26 5.173a1 1 0 01-.733.25 1 1 0 11-.233.568l.096.153a1 1 0 01-.125.316l-.054.145a1 1 0 01-.37.218 1 1 0 11-.529-.153l-.28-.115a1 1 0 01-.07-.308l.216-.353a1 1 0 01.287-.17 1 1 0 11.521.028l.267.108c.39.157.813.23 1.26.23s.87-.073.87-.23l.27-.11a1 1 0 01.521-.02c.448-.17.895-.37 1.323-.643a9.988 9.988 0 01.32-.25 10 10 0 011.198-.05 1.016 1.016 0 01.372.096l.165.065a1 1 0 01.316.3zM1.72 7.974a9.959 9.959 0 01-.179 1.018c-.44.68-1.007 1.314-1.814 1.635a3.503 3.503 0 00-1.058.337 3.378 3.378 0 00-.608.893 3.203 3.203 0 00-.285 1.178c.04.552.102 1.088.174 1.619a13.948 13.948 0 00.676 2.098 2.225 2.225 0 01.323 1.255c.235.502.508.972.813 1.383.306.41.64.79.988 1.136a10.035 10.035 0 01-.02.7c-.008.31-.016.63-.024.946a7.976 7.976 0 00-.177 1.05 3.557 3.557 0 01-.332.894 3.352 3.352 0 00-.287 1.168c.036.573.107 1.135.173 1.688a1.734 1.734 0 00.238.637 1.699 1.699 0 01.118.398 1.662 1.662 0 00.33.218 3.605 3.605 0 011.168.13c.614 0 1.154-.12 1.708-.36.555-.24 1.06-.535 1.526-.889.466-.354.866-.78.1.055l.18.014ZM5.412 5.164a1 1 0 01.723.25 1 1 0 11.285.568l.1.152a1 1 0 01.125.316l.054.145a1 1 0 01.37.218 1 1 0 11.529.153l.28-.115a1 1 0 01.07-.308l-.216-.353a1 1 0 01-.287-.17 1 1 0 11-.521.028l-.267.108c-.39.157-.813.23-1.26.23s-.87.073-.87-.23l-.27-.11a1 1 0 01-.521-.02c-.448-.17-.895-.37-1.323-.643a9.988 9.988 0 01-.32-.25 10 10 0 01-1.198-.05 1.016 1.016 0 01-.372.096l-.165.065a1 1 0 01-.316.3zM5.412 5.164" />
                            </svg>
                            Login
                        </button>
                    </NavLink>
                </div>
                <NavLink to="/game">
                    <button
                        className="inline-flex w-full hover:bg-blue-600 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                    >
                        Play game
                        <KeyboardTabIcon style={{marginLeft: '8px'}}/>
                    </button>
                </NavLink>
                <NavLink to="/game">
                    <button
                        className="inline-flex w-full hover:bg-blue-600 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
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