import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios.js";


const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await API.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-10 relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">


                    <h1 className="text-3xl font-bold">
                        Create your account
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Get started with Forma AI
                    </p>

                </div>

                {/* Register Card */}
                <div className="relative">

                    {/* Card Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-10"></div>

                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl">

                        <h2 className="text-xl font-semibold mb-6">
                            Create account
                        </h2>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div>

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                                />

                            </div>

                            {/* Email */}
                            <div>

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                                />

                            </div>

                            {/* Password */}
                            <div>

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 8 characters"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                                />

                                <p className="text-xs text-zinc-600 mt-2">
                                    Use at least 8 characters with letters and numbers.
                                </p>

                            </div>

                            {/* Confirm Password */}
                            <div>

                                <label className="block text-sm text-zinc-300 mb-2">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                                />

                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create account"
                                }
                            </button>

                        </form>

                        {/* Login */}
                        <div className="mt-6 pt-5 border-t border-zinc-800 text-center">

                            <p className="text-sm text-zinc-500">
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="text-orange-400 hover:text-orange-300 font-medium transition"
                                >
                                    Sign in
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

                <p className="text-center text-xs text-zinc-700 mt-6">
                    Forma AI · Forms that understand you.
                </p>

            </div>

        </div>
    );
};

export default Register;