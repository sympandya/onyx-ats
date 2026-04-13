import { useState } from "react";

// Hardcoded Salary Data based on your exact specifications
const salaryData = {
    "Accounts Manager": { "Entry": "₹3,00,000 – ₹6,50,000", "Mid": "₹6,00,000 – ₹12,50,000", "Senior": "₹12,00,000 – ₹22,00,000", "Expert": "₹20,00,000 – ₹35,00,000" },
    "AI Engineer": { "Entry": "₹6,00,000 – ₹15,00,000", "Mid": "₹12,00,000 – ₹25,00,000", "Senior": "₹20,00,000 – ₹40,00,000", "Expert": "₹35,00,000 – ₹70,00,000" },
    "Android Developer": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Automation Tester": { "Entry": "₹3,00,000 – ₹7,50,000", "Mid": "₹6,00,000 – ₹14,00,000", "Senior": "₹12,00,000 – ₹22,00,000", "Expert": "₹20,00,000 – ₹40,00,000" },
    "Backend Developer": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Blockchain Developer": { "Entry": "₹6,00,000 – ₹18,00,000", "Mid": "₹12,00,000 – ₹30,00,000", "Senior": "₹25,00,000 – ₹50,00,000", "Expert": "₹40,00,000 – ₹80,00,000" },
    "Business Analyst": { "Entry": "₹4,00,000 – ₹8,50,000", "Mid": "₹8,00,000 – ₹16,00,000", "Senior": "₹14,00,000 – ₹25,00,000", "Expert": "₹20,00,000 – ₹40,00,000" },
    "Cloud Engineer": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Content Writer": { "Entry": "₹2,00,000 – ₹5,50,000", "Mid": "₹4,00,000 – ₹10,00,000", "Senior": "₹8,00,000 – ₹18,00,000", "Expert": "₹15,00,000 – ₹30,00,000" },
    "Customer Support Executive": { "Entry": "₹2,00,000 – ₹4,50,000", "Mid": "₹3,00,000 – ₹7,50,000", "Senior": "₹5,00,000 – ₹12,00,000", "Expert": "₹10,00,000 – ₹20,00,000" },
    "Cyber Security Analyst": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹20,00,000", "Senior": "₹15,00,000 – ₹35,00,000", "Expert": "₹25,00,000 – ₹60,00,000" },
    "Data Analyst": { "Entry": "₹4,00,000 – ₹9,50,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Data Scientist": { "Entry": "₹6,00,000 – ₹15,00,000", "Mid": "₹12,00,000 – ₹25,00,000", "Senior": "₹20,00,000 – ₹40,00,000", "Expert": "₹35,00,000 – ₹70,00,000" },
    "DevOps Engineer": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Digital Marketing Executive": { "Entry": "₹2,50,000 – ₹6,50,000", "Mid": "₹5,00,000 – ₹12,00,000", "Senior": "₹10,00,000 – ₹20,00,000", "Expert": "₹18,00,000 – ₹35,00,000" },
    "Digital Marketing Manager": { "Entry": "₹4,00,000 – ₹8,50,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Finance Executive": { "Entry": "₹3,00,000 – ₹7,50,000", "Mid": "₹6,00,000 – ₹14,00,000", "Senior": "₹12,00,000 – ₹25,00,000", "Expert": "₹20,00,000 – ₹40,00,000" },
    "Frontend Developer": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Full Stack Developer": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "HR Executive": { "Entry": "₹3,00,000 – ₹6,50,000", "Mid": "₹5,00,000 – ₹12,00,000", "Senior": "₹10,00,000 – ₹20,00,000", "Expert": "₹18,00,000 – ₹35,00,000" },
    "HR Manager": { "Entry": "₹4,00,000 – ₹8,50,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "iOS Developer": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Java Developer": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Machine Learning Engineer": { "Entry": "₹6,00,000 – ₹15,00,000", "Mid": "₹12,00,000 – ₹25,00,000", "Senior": "₹20,00,000 – ₹40,00,000", "Expert": "₹35,00,000 – ₹70,00,000" },
    "Operations Manager": { "Entry": "₹5,00,000 – ₹10,00,000", "Mid": "₹10,00,000 – ₹20,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Product Manager": { "Entry": "₹8,00,000 – ₹18,00,000", "Mid": "₹15,00,000 – ₹30,00,000", "Senior": "₹25,00,000 – ₹50,00,000", "Expert": "₹40,00,000 – ₹80,00,000" },
    "Project Manager": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹22,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹60,00,000" },
    "Python Developer": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "QA Engineer": { "Entry": "₹3,00,000 – ₹7,50,000", "Mid": "₹6,00,000 – ₹14,00,000", "Senior": "₹12,00,000 – ₹22,00,000", "Expert": "₹20,00,000 – ₹40,00,000" },
    "React Developer": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹8,00,000 – ₹18,00,000", "Senior": "₹15,00,000 – ₹30,00,000", "Expert": "₹25,00,000 – ₹50,00,000" },
    "Sales Executive": { "Entry": "₹2,00,000 – ₹6,50,000", "Mid": "₹5,00,000 – ₹12,00,000", "Senior": "₹10,00,000 – ₹25,00,000", "Expert": "₹20,00,000 – ₹50,00,000" },
    "Sales Manager": { "Entry": "₹4,00,000 – ₹10,00,000", "Mid": "₹10,00,000 – ₹20,00,000", "Senior": "₹18,00,000 – ₹35,00,000", "Expert": "₹30,00,000 – ₹70,00,000" },
    "SAP FICO Consultant": { "Entry": "₹5,00,000 – ₹12,00,000", "Mid": "₹10,00,000 – ₹25,00,000", "Senior": "₹20,00,000 – ₹40,00,000", "Expert": "₹35,00,000 – ₹70,00,000" },
    "SEO Analyst": { "Entry": "₹2,50,000 – ₹6,50,000", "Mid": "₹5,00,000 – ₹12,00,000", "Senior": "₹10,00,000 – ₹20,00,000", "Expert": "₹18,00,000 – ₹35,00,000" },
    "Software Engineer": { "Entry": "₹3,50,000 – ₹9,92,800", "Mid": "₹5,50,000 – ₹18,50,000", "Senior": "₹9,89,500 – ₹27,30,000", "Expert": "₹20,00,000 – ₹45,00,000" },
    "UI/UX Designer": { "Entry": "₹3,00,000 – ₹8,50,000", "Mid": "₹6,00,000 – ₹15,00,000", "Senior": "₹12,00,000 – ₹25,00,000", "Expert": "₹20,00,000 – ₹40,00,000" }
};

const experienceLevels = [
    { label: "0-1 Years (Entry Level / Fresher)", value: "Entry" },
    { label: "2-4 Years (Mid Level)", value: "Mid" },
    { label: "5-7 Years (Senior Level)", value: "Senior" },
    { label: "8+ Years (Expert / Lead)", value: "Expert" }
];

export const SalaryEstimator = () => {
    // Blank initial states
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (role && experience) {
            setResult(salaryData[role][experience]);
            setShowResult(true);
        }
    };

    // Reset result view if user changes an input after calculating
    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setShowResult(false);
    }

    const handleExpChange = (e) => {
        setExperience(e.target.value);
        setShowResult(false);
    }

    return (
        <div className="max-w-5xl mx-auto py-16 px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your Market Value in India</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    Get accurate salary estimates based on real market data. Perfect for freshers preparing for interviews and experienced professionals negotiating offers.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
                
                {/* Inputs Stacked Vertically */}
                <div className="flex flex-col gap-6 mb-8">
                    
                    {/* Role Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Select Your Job Role</label>
                        <div className="relative">
                            <select 
                                value={role}
                                onChange={handleRoleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0d1b2a] focus:border-transparent appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Job Role...</option>
                                {Object.keys(salaryData).map((job) => (
                                    <option key={job} value={job}>{job}</option>
                                ))}
                            </select>
                            {/* Dropdown Chevron Logo */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Experience Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Years of Experience</label>
                        <div className="relative">
                            <select 
                                value={experience}
                                onChange={handleExpChange}
                                className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0d1b2a] focus:border-transparent appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Experience Level...</option>
                                {experienceLevels.map((lvl) => (
                                    <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                                ))}
                            </select>
                            {/* Dropdown Chevron Logo */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculate Button */}
                <button 
                    onClick={handleCalculate}
                    disabled={!role || !experience}
                    className="w-full py-4 bg-[#0d1b2a] hover:bg-[#1a2b40] text-white font-bold rounded-lg transition-colors duration-200 uppercase tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Calculate My Expected Salary
                </button>

                {/* Result Card - Conditionally Rendered */}
                {showResult && result && (
                    <div className="mt-8 bg-[#fffdf0] border border-[#f0e6c2] rounded-xl py-10 px-6 text-center shadow-inner transition-opacity duration-500 ease-in-out">
                        <p className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">Estimated Annual Salary Range</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2a7a3e] tracking-tight mb-3">
                            {result}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">per year • Before taxes</p>
                    </div>
                )}

            </div>
        </div>
    );
};