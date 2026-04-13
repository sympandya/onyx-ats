import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../components/SuccessModal.jsx";
import { ErrorModal } from "../components/ErrorModal.jsx";

export const PostJob = ()=>{

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // Form Data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [numOfOpenings, setNumOfOpenings] = useState(1);
    const [workMode, setWorkMode] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [skillsText, setSkillsText] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setValidationErrors([]);
        setIsSubmitting(true);

        const requiredSkills = skillsText
            .toLowerCase()
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill !== "");

        try{
            const response = await axiosInstance.post('/job', {
                title: title,
                description: description,
                jobType: jobType,
                numOfOpenings: numOfOpenings,
                workMode: workMode,
                experienceLevel: experienceLevel,
                location: location,
                salary: salary,
                requiredSkills: requiredSkills
            });
            if(response.status === 201) {
                setIsSubmitting(false);
                setIsSubmitted(true);
            }
        } 
        catch (e) {
            setIsSubmitting(false);
            setHasError(true);
            console.error("Something went wrong while retriving the job details", e);
            if (e.response?.data?.errors) {
                setValidationErrors(e.response.data.errors);
            } else if (e.response?.data?.msg) {
                setValidationErrors([e.response.data.msg]);
            } else {
                setValidationErrors(["An unexpected network error occurred."]);
            }
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            {/* Inline Error Banner */}
            {validationErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-bold text-red-800 mb-1">Please fix the following errors:</h3>
                            <ul className="list-disc pl-4 text-sm text-red-700 space-y-1">
                                {validationErrors.map((err, index) => (
                                    <li key={index}>{err.message || err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <ErrorModal 
                isOpen={hasError} 
                onClose={() => setHasError(false)} 
                errMsg="Failed to post job. Please try again."
            />

            <SuccessModal 
                isOpen={isSubmitted} 
                onClose={() => navigate(-1)} 
                successMsg="Your job has been successfully posted!"
            />
            
            {/* Header */}
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                <p className="text-gray-500">Fill out the details below to publish an opening on the job board.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: The Form */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        
                        {/* Section 1: Basic Details */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Basic Details</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="e.g. Senior Frontend Developer"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} 
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                                    <textarea 
                                        required
                                        rows="5"
                                        placeholder="Describe the responsibilities, requirements, and perks..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Job Attributes */}
                        <div className="mb-8 border-t pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Job Attributes</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                                    <select 
                                        required
                                        value={jobType}
                                        onChange={(e) => setJobType(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e] bg-white"
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="contract">Contract</option>
                                        <option value="freelance">Freelance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode *</label>
                                    <select 
                                        required
                                        value={workMode}
                                        onChange={(e) => setWorkMode(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e] bg-white"
                                    >
                                        <option value="" disabled>Select Mode</option>
                                        <option value="on-site">On-site</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                                    <select 
                                        required
                                        value={experienceLevel}
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e] bg-white"
                                    >
                                        <option value="" disabled>Select Level</option>
                                        <option value="entry-level">Entry-level</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="senior">Senior-level</option>
                                        <option value="executive">Executive</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Openings *</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="1"
                                        value={numOfOpenings}
                                        onChange={(e) => setNumOfOpenings(Number(e.target.value))}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Logistics & Requirements */}
                        <div className="mb-8 border-t pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Logistics & Requirements</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Ahmedabad"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. ₹350k - 400k"
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                            className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                                    <input 
                                        type="text" 
                                        placeholder="React, Node.js, TailwindCss (comma separated)"
                                        value={skillsText}
                                        onChange={(e) => setSkillsText(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 justify-end border-t pt-6">
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-[#256a5e] hover:bg-[#1d5349] text-white font-medium rounded-md transition-colors disabled:opacity-70 shadow-sm"
                            >
                                {isSubmitting ? "Publishing..." : "Post Job"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Information/Sidebar */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    
                    {/* Tips Card */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Tips for Success</h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>Be specific in your job title to attract the right candidates.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>Include compensation details to increase application rates by up to 30%.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>List 3-5 core skills so candidates know exactly what you're looking for.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Visibility Card */}
                    <div className="bg-[#f2f9f8] p-6 rounded-xl border border-[#e0f2ef]">
                        <h3 className="text-sm font-bold text-[#1d5349] mb-3 uppercase tracking-wider">Visibility</h3>
                        <p className="text-sm text-[#2a6d61] mb-2">
                            Once posted, this job will be immediately visible to all registered job seekers on the platform.
                        </p>
                        <p className="text-sm text-[#2a6d61]">
                            You can edit or close this listing at any time from your dashboard.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}