import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios.js";
import { ErrorModal } from "../components/ErrorModal.jsx";
import { SuccessModal } from "../components/SuccessModal.jsx";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState.js";

export const CandidateProfileUpdate = ()=>{

    const setUser = useSetRecoilState(userState);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState("");
    const [bio, setBio] = useState("");
    const [defaultResumeLink, setDefaultResumeLink] = useState("");

    const [hasError, setHasError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`/user/me`); 
                
                if (response.status === 200) {
                    const userData = response.data.user || response.data;
                    
                    setName(userData.name || "");
                    setEmail(userData.email || "");
                    setBio(userData.bio || "");
                    setDefaultResumeLink(userData.defaultResumeLink || "");
                    
                    if (userData.skills && Array.isArray(userData.skills)) {
                        setSkills(userData.skills.join(", "));
                    } else {
                        setSkills(userData.skills || "");
                    }
                }
            } catch (e) {
                console.error("Failed to fetch existing profile data", e);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfileData();
    }, []);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setValidationErrors([]);
        setIsSubmitting(true); 
        setHasError(false);

        let updatePayload = {};
        if(name) updatePayload.name = name;
        if(email) updatePayload.email = email;
        if(skills) updatePayload.skills = skills.split(',').map(skill => skill.trim()).filter(skill => skill !== "");
        if(bio) updatePayload.bio = bio;
        if(defaultResumeLink) updatePayload.defaultResumeLink = defaultResumeLink;

        try{
            const response = await axiosInstance.patch(`/user/candidate/profileUpdate`, updatePayload);
            if(response.status === 200){
                setUser(prev => ({
                    ...prev,
                    ...updatePayload 
                }));
                setIsSubmitting(false);
                setIsSubmitted(true);
            }
        }
        catch(e){
            setIsSubmitting(false);
            setHasError(true);
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
                errMsg="Failed to update profile. Please check your inputs and try again."
            />

            <SuccessModal 
                isOpen={isSubmitted} 
                onClose={() => navigate(-1)} 
                successMsg="Your profile has been successfully updated!"
            />
            
            {/* Header */}
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Profile</h1>
                <p className="text-gray-500">Keep your details up to date to stand out to recruiters.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: The Form */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        
                        {/* Section 1: Basic Details */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Personal Information</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Jane Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} 
                                            className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="jane@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Professional Details */}
                        <div className="mb-8 border-t pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Professional Background</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                                    <textarea 
                                        rows="4"
                                        placeholder="Write a short bio highlighting your experience, goals, and what makes you unique..."
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. React, Node.js, Python (comma separated)"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Separate each skill with a comma.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Resume */}
                        <div className="mb-8 border-t pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Resume Link</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Resume URL</label>
                                    <input 
                                        type="url" 
                                        placeholder="https://link-to-your-resume.com/document.pdf"
                                        value={defaultResumeLink}
                                        onChange={(e) => setDefaultResumeLink(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Provide a public link to your Google Drive, Dropbox, or personal website.</p>
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
                                disabled={isSubmitting || (!name && !email && !skills && !bio && !defaultResumeLink)}
                                className="px-8 py-2.5 bg-[#256a5e] hover:bg-[#1d5349] text-white font-medium rounded-md transition-colors disabled:opacity-70 shadow-sm"
                            >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Information/Sidebar */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    
                    {/* Tips Card */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Profile Tips</h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>A strong, well-written bio increases recruiter engagement by up to 40%.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>Ensure your skills are comma-separated so our matching algorithm can easily read them.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-[#256a5e] font-bold">•</span>
                                <span>Make sure your resume link is set to "Public" or "Anyone with the link can view".</span>
                            </li>
                        </ul>
                    </div>

                    {/* Visibility Card */}
                    <div className="bg-[#f2f9f8] p-6 rounded-xl border border-[#e0f2ef]">
                        <h3 className="text-sm font-bold text-[#1d5349] mb-3 uppercase tracking-wider">Privacy & Visibility</h3>
                        <p className="text-sm text-[#2a6d61] mb-2">
                            Your profile information is only shared with recruiters when you actively apply for a job or if you set your profile to public.
                        </p>
                        <p className="text-sm text-[#2a6d61]">
                            You can update these details at any time.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}