import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, ArrowRight, LoaderCircle, AlertCircle, FileText, Brain, Lock, CheckCircle2 } from "lucide-react";
import API from "../api/axios.js";
import formaLogo from "../assets/formaa.png"
import DynamicForm from "../components/DynamicForm.jsx";

const Claim = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [story, setStory] = useState("");
    const [extractedData, setExtractedData] = useState({});
    const [extracting, setExtracting] = useState(false);
    const [engineStatus, setEngineStatus] = useState(null);
    

    const handleNewClaim = () => {
        setStory("");
        setExtractedData(null);
    };

    const fields = form?.fields || [];

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await API.get("/forms/auto-insurance-claim");

                console.log("Backend response:", response.data);

                setForm(response.data.data);
            } catch (error) {
                console.error("Failed to fetch form:", error);
                setError("Unable to load your claim form.");
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, []);

        useEffect(() => {
        const fetchEngineStatus = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8001/status"
                );

                console.log("STATUS RESPONSE:", response);

                const data = await response.json();
                console.log("STATUS DATA:", data);

                setEngineStatus(data);
            } catch (error) {
                console.error("Failed to fetch AI engine status:", error);
            }
        };

        fetchEngineStatus();
    }, []);

    const handleExtract = async () => {
    if (!story.trim()) {
        return;
    }

    try {
        setExtracting(true);

        const response = await API.post("/ai/extract", {
            story,
            fields
        });

        console.log("AI extracted data:", response.data);

        setExtractedData(response.data.data);

        console.log("AI extracted fields:", Object.keys(response.data.data));

    } catch (error) {
        console.error("AI extraction failed:", error);
    } finally {
        setExtracting(false);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <LoaderCircle size={52} className="text-orange-500 animate-spin mx-auto mb-6" />
                    <h2 className="text-xl font-semibold text-white">Preparing your claim</h2>
                    <p className="text-zinc-500 mt-2">Forma AI is preparing your form...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-3xl p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <AlertCircle size={28} className="text-red-400" />
                    </div>

                    <h2 className="text-xl font-semibold text-white">Something went wrong</h2>

                    <p className="text-zinc-500 mt-2">{error}</p>
                </div>
            </div>
        );
    }

    

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">

            {/* Background Glow */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}

            <nav className="relative z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center">
                            <img src={formaLogo} alt="Forma AI Logo" className="w-full h-full object-contain" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">Forma AI</h1>
                            <p className="text-xs text-zinc-500">Intelligent Forms</p>
                        </div>
                    </div>

                    {/* AI Status */}

                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                        <span className="text-sm text-orange-300">AI Assistant Online</span>
                    </div>
                </div>
            </nav>

            {/* Main */}

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-14">

                {/* Hero */}

                <section className="text-center max-w-4xl mx-auto mb-14">

                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-rose-500/15 border border-orange-500/25">
                        <Sparkles size={18} className="text-orange-400" />
                        <span className="text-sm font-medium text-orange-300">AI-Powered Insurance Claims</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        File your claim
                        <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                            without the paperwork.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        Tell Forma AI what happened in your own words. Our AI understands your story and helps complete the information you need.
                    </p>
                </section>


                {/* AI Engine Status */}

                {engineStatus && (
                    <section className="mb-6">
                        <div className="rounded-2xl bg-zinc-900 border border-orange-500/20 overflow-hidden">

                            <div className="px-5 py-4 flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`w-2.5 h-2.5 rounded-full ${
                                            engineStatus.available
                                                ? "bg-green-400"
                                                : "bg-orange-400"
                                        }`}
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            AI Engine
                                        </p>

                                        <p className="text-xs text-zinc-500 mt-0.5">
                                            {engineStatus.available
                                                ? "Running locally on Snapdragon NPU"
                                                : "Development mode • Snapdragon deployment ready"}
                                        </p>
                                    </div>

                                </div>

                                <span
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                        engineStatus.available
                                            ? "bg-green-500/10 text-green-300 border border-green-500/20"
                                            : "bg-orange-500/10 text-orange-300 border border-orange-500/20"
                                    }`}
                                >
                                    {engineStatus.available
                                        ? "GenieX QAIRT"
                                        : "Gemini Fallback"}
                                </span>

                            </div>

                            <div className="border-t border-zinc-800 px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">

                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Model
                                    </p>
                                    <p className="text-xs text-zinc-300 mt-1">
                                        {engineStatus.model}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Precision
                                    </p>
                                    <p className="text-xs text-zinc-300 mt-1">
                                        {engineStatus.precision}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Runtime
                                    </p>
                                    <p className="text-xs text-zinc-300 mt-1">
                                        {engineStatus.runtime}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Target
                                    </p>
                                    <p className="text-xs text-zinc-300 mt-1">
                                        {engineStatus.device}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </section>
                )}
                {/* Magic Input */}

                <section className="relative mb-10">

                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl blur opacity-20"></div>

                    <div className="relative bg-zinc-900 border border-orange-500/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-orange-500/5">

                        <div className="flex items-start gap-4 mb-6">

                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <Sparkles size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">Magic Input</h2>
                                <p className="text-sm text-zinc-500 mt-1">Describe the incident naturally. Forma AI will extract the details.</p>
                            </div>

                        </div>

                        <textarea 
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            placeholder="Example: I hit a deer on I-95 yesterday in my Honda, and the windshield shattered..." className="w-full min-h-40 resize-none rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4 text-white placeholder:text-zinc-600 outline-none transition duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">

                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                                <Brain size={15} className="text-orange-500" />
                                <span>AI extracts information from your story</span>
                            </div>

                            <button 
                                onClick={handleExtract}
                                disabled={extracting}
                                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:via-amber-400 hover:to-orange-400 font-bold shadow-xl shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <Sparkles size={18} />
                                {extracting ? "Extracting..." : "Extract with AI"}
                            </button>

                        </div>
                    </div>
                </section>



                {/* AI Extraction Result */}

                {Object.keys(extractedData || {}).length > 0 && (
                    <section className="mb-10">
                        <div className="bg-zinc-900 border border-orange-500/20 rounded-3xl p-6 md:p-8 shadow-xl shadow-orange-500/5">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-xs font-bold tracking-widest text-orange-500 mb-2">
                                        AI ANALYSIS
                                    </p>

                                    <h2 className="text-2xl font-bold text-white">
                                        We understood your claim
                                    </h2>

                                    <p className="text-zinc-500 mt-1">
                                        Review the information extracted from your story.
                                    </p>
                                </div>

                                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                                    <CheckCircle2 size={16} className="text-orange-400" />
                                    <span className="text-sm text-orange-300">
                                        AI Extracted
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {Object.entries(extractedData).map(([fieldId, value]) => {

                                    const field = fields.find(
                                        (item) => item.id === fieldId || item.name === fieldId
                                    );

                                    return (
                                        <div
                                            key={fieldId}
                                            className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800"
                                        >
                                            <p className="text-xs uppercase tracking-wider text-zinc-600 mb-2">
                                                {field?.label || fieldId}
                                            </p>

                                            <p className="text-white font-medium">
                                                {String(value)}
                                            </p>
                                        </div>
                                    );
                                })}


                                
                            </div>


                            {/* Missing Information */}

                            {(() => {
                                const missingFields = fields.filter((field) => {
                                    const isVisible =
                                        !field.showIf ||
                                        extractedData[field.showIf.field] === field.showIf.value;

                                    const isMissing =
                                        field.required &&
                                        isVisible &&
                                        !extractedData[field.id];

                                    return isMissing;
                                });

                                if (missingFields.length === 0) {
                                    return (
                                        <div className="mt-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle2
                                                    size={18}
                                                    className="text-green-400"
                                                />

                                                <div>
                                                    <p className="text-sm font-semibold text-green-300">
                                                        All required information found
                                                    </p>

                                                    <p className="text-xs text-zinc-500 mt-1">
                                                        You can review the form below and submit your claim.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="mt-6 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20">

                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                                <AlertCircle
                                                    size={18}
                                                    className="text-orange-400"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-orange-300">
                                                    Still needed
                                                </p>

                                                <p className="text-xs text-zinc-500">
                                                    Please provide the following information.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            {missingFields.map((field) => (
                                                <div
                                                    key={field.id}
                                                    className="flex items-center gap-3 text-sm text-zinc-300"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                    {field.label}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                );
                            })()}


                            

                        </div>
                    </section>
                )}

                {/* Stats */}

                <section className="grid md:grid-cols-3 gap-4 mb-12">

                    {/* Form */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <FileText size={19} className="text-orange-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-zinc-600">Form</p>
                                <p className="font-semibold mt-1 text-zinc-200">{form?.name || "Insurance Claim"}</p>
                            </div>
                        </div>

                    </div>

                    {/* Questions */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-500/20 transition">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <FileText size={19} className="text-amber-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-zinc-600">Questions</p>
                                <p className="font-semibold text-2xl mt-1 text-white">{fields.length}</p>
                            </div>
                        </div>

                    </div>

                    {/* AI */}

                    <div className="bg-gradient-to-br from-orange-500/10 to-rose-500/5 border border-orange-500/20 rounded-2xl p-5">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Brain size={19} className="text-orange-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-orange-500">Intelligence</p>
                                <p className="font-semibold mt-1 text-orange-300">AI Extraction Enabled</p>
                            </div>
                        </div>

                    </div>

                </section>

                {/* Claim Form */}

                <section>

                    <div className="flex items-end justify-between mb-6">

                        <div>
                            <p className="text-sm font-bold tracking-widest text-orange-500 mb-2">CLAIM DETAILS</p>

                            <h2 className="text-3xl font-bold">Tell us about the incident</h2>

                            <p className="text-zinc-500 mt-2">We'll only ask for what is necessary.</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-600">
                            <FileText size={15} />
                            <span>{fields.length} questions</span>
                        </div>

                    </div>

                    {/* Form Card */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">

                       <DynamicForm fields={fields} extractedData={extractedData} onNewClaim = {handleNewClaim} />

                    </div>

                </section>
            </main>

            {/* Footer */}

            <footer className="relative z-10 border-t border-zinc-800 mt-14">

                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center">
                            <img src={formaLogo} alt="Forma AI Logo" className="w-full h-full object-contain" />
                        </div>

                        <span className="text-sm font-semibold text-zinc-400">
                            Forma AI
                        </span>
                    </div>

                    <p className="text-sm text-zinc-600">
                        Forms that understand you.
                    </p>

                </div>

            </footer>

        </div>
    );
};

export default Claim;