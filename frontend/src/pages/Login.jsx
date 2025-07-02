import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Mock login - store username and redirect
        localStorage.setItem("user-name", username);
        navigate("/game");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-8">
            <div className="bg-gray-100 p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full rounded bg-primary-600 py-2 px-4 text-white font-medium hover:bg-primary-700"
                    >
                        Sign In
                    </button>
                    <p className="text-center text-sm mt-4">
                        <a href="#" className="underline text-primary-600">
                            Create account
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}