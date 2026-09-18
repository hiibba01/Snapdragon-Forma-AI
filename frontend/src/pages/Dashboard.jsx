import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, clearAuth } from "../utils/auth.js";
import API from "../api/axios.js";
import formaLogo from "../assets/formaa.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getUser();

    const [claims, setClaims] = useState([]);
    const [loadingClaims, setLoadingClaims] = useState(true);
    const [claimsError, setClaimsError] = useState("");

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await API.get("/claims/my");

                setClaims(response.data.data || []);

            } catch (error) {
                console.error("Failed to fetch claims:", error);

                setClaimsError(
                    error.response?.data?.message ||
                    "Unable to load your claims!"
                );
            } finally {
                setLoadingClaims(false);
            }
        };

        fetchClaims();
    }, []);

    const handleLogout = () => {
        clearAuth();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />

                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

            </div>

            <div className="relative z-10">

                {/* Navbar */}
                <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">

                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <img
                                src={formaLogo}
                                alt="Forma AI"
                                className="w-10 h-10 object-contain"
                            />

                            <div>
                                <h1 className="font-bold">
                                    Forma AI
                                </h1>

                                <p className="text-xs text-zinc-600">
                                    Intelligent Claims
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-zinc-400 hover:text-white transition"
                        >
                            Sign out
                        </button>

                    </div>

                </nav>


                {/* Main */}
                <main className="max-w-6xl mx-auto px-6 py-12">

                    {/* Welcome */}
                    <div className="mb-10">

                        <p className="text-sm text-orange-400 mb-2">
                            Dashboard
                        </p>

                        <h2 className="text-4xl font-bold">
                            Welcome{user?.name ? `, ${user.name}` : ""}
                        </h2>

                        <p className="text-zinc-500 mt-3 max-w-xl">
                            Manage your insurance claims and use Forma AI
                            to turn your incident description into structured
                            claim information.
                        </p>

                    </div>


                    {/* Main Action */}
                    <div className="relative mb-8">

                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-10" />

                        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                            <div className="max-w-2xl">

                                <p className="text-xs uppercase tracking-wider text-orange-400 mb-3">
                                    AI-powered claims
                                </p>

                                <h3 className="text-2xl font-bold mb-3">
                                    Start a new claim
                                </h3>

                                <p className="text-zinc-500 mb-6">
                                    Describe what happened in your own words.
                                    Forma AI will extract the relevant
                                    information and help you complete the
                                    claim form.
                                </p>

                                <Link
                                    to="/claim"
                                    className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 font-semibold transition"
                                >
                                    Create new claim
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                        {/* Account */}
                        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-3">

                            <p className="text-xs text-zinc-600">
                                Account
                            </p>

                            <div className="flex items-center justify-between mt-1">

                                <p className="text-sm font-medium text-zinc-300">
                                    Active
                                </p>

                                <span className="w-2 h-2 rounded-full bg-emerald-400" />

                            </div>

                        </div>


                        {/* AI Assistance */}
                        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-3">

                            <p className="text-xs text-zinc-600">
                                AI Assistance
                            </p>

                            <div className="flex items-center justify-between mt-1">

                                <p className="text-sm font-medium text-zinc-300">
                                    Enabled
                                </p>

                                <span className="text-xs text-orange-400">
                                    AI
                                </span>

                            </div>

                        </div>


                        {/* Total Claims */}
                        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-3">

                            <p className="text-xs text-zinc-600">
                                Total Claims
                            </p>

                            <div className="flex items-center justify-between mt-1">

                                <p className="text-sm font-medium text-zinc-300">
                                    {claims.length}
                                </p>

                                <span className="text-xs text-zinc-600">
                                    {claims.length === 1 ? "claim" : "claims"}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* My Claims */}
                    <div className="mt-12">

                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">

                            <div>

                                <p className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-2">
                                    Claims overview
                                </p>

                                <h3 className="text-2xl font-bold tracking-tight">
                                    My Claims
                                </h3>

                                <p className="text-sm text-zinc-500 mt-2">
                                    View and track the insurance claims you have submitted.
                                </p>

                            </div>

                            {claims.length > 0 && (
                                <p className="text-sm text-zinc-500">
                                    <span className="text-zinc-300 font-medium">
                                        {claims.length}
                                    </span>{" "}
                                    {claims.length === 1 ? "claim" : "claims"}
                                </p>
                            )}

                        </div>


                        {/* Loading */}
                        {loadingClaims ? (

                            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-10 text-center">

                                <div className="w-7 h-7 mx-auto mb-4 rounded-full border-2 border-zinc-700 border-t-orange-400 animate-spin" />

                                <p className="text-sm text-zinc-500">
                                    Loading your claims...
                                </p>

                            </div>

                        ) : claimsError ? (

                            /* Error */
                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">

                                <p className="text-sm text-red-400">
                                    {claimsError}
                                </p>

                            </div>

                        ) : claims.length === 0 ? (

                            /* Empty State */
                            <div className="relative overflow-hidden bg-zinc-900/70 border border-zinc-800 rounded-2xl">

                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

                                <div className="relative px-8 py-12 text-center">

                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-800/70 border border-zinc-700/70 flex items-center justify-center mb-5">

                                        <div className="w-6 h-6 rounded-lg border-2 border-zinc-500" />

                                    </div>

                                    <h4 className="text-lg font-semibold">
                                        No claims yet
                                    </h4>

                                    <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
                                        You haven't submitted any insurance claims yet.
                                        Start a new claim and Forma AI will help structure
                                        your incident details.
                                    </p>

                                    <Link
                                        to="/claim"
                                        className="inline-flex items-center mt-6 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-400 hover:via-amber-400 hover:to-rose-400 text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-500/10"
                                    >
                                        Create your first claim
                                    </Link>

                                </div>

                            </div>

                        ) : (

                            /* Claims List */
                            <div className="space-y-4">

                                {claims.map((claim, index) => (

                                    <div
                                        key={claim._id}
                                        className="group relative overflow-hidden bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                                    >

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.03] via-transparent to-rose-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <div className="relative p-6">

                                            {/* Claim Header */}
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                                                <div className="flex items-start gap-4">

                                                    {/* Claim Number */}
                                                    <div className="hidden sm:flex w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/10 items-center justify-center">

                                                        <span className="text-sm font-semibold text-orange-400">
                                                            #{index + 1}
                                                        </span>

                                                    </div>

                                                    <div>

                                                        <div className="flex flex-wrap items-center gap-3">

                                                            <h4 className="text-lg font-semibold capitalize">
                                                                {claim.data?.incidentType
                                                                    ?.replace(/_/g, " ") ||
                                                                    "Insurance Claim"}
                                                            </h4>

                                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                                Submitted
                                                            </span>

                                                        </div>

                                                        <p className="text-xs text-zinc-600 mt-1.5 font-mono">
                                                            ID: {claim._id?.slice(-8).toUpperCase()}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Date */}
                                                <div className="md:text-right">

                                                    <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                                                        Submitted
                                                    </p>

                                                    <p className="text-sm text-zinc-400 mt-1">
                                                        {new Date(
                                                            claim.createdAt
                                                        ).toLocaleDateString("en-US", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Claim Details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-800/80">

                                                {/* Vehicle */}
                                                <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/60">

                                                    <p className="text-[11px] uppercase tracking-wider text-zinc-600 mb-1.5">
                                                        Vehicle
                                                    </p>

                                                    <p className="text-sm text-zinc-300 font-medium">
                                                        {claim.data?.vehicle ||
                                                            "Not specified"}
                                                    </p>

                                                </div>


                                                {/* Damage */}
                                                <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/60">

                                                    <p className="text-[11px] uppercase tracking-wider text-zinc-600 mb-1.5">
                                                        Damage
                                                    </p>

                                                    <p className="text-sm text-zinc-300 font-medium line-clamp-2">
                                                        {claim.data?.damage ||
                                                            "No damage details provided"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default Dashboard;