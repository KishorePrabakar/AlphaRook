import { NavLink } from 'react-router-dom';

import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

export default function Home() {
    return (
        <div className="bg-white h-screen flex items-center justify-center">

            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    AlphaRook
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                Play chess with friends in real-time
                </p>
                <div className="flex flex-col w-full mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">

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