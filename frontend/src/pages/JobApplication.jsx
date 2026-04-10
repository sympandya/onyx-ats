import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UserAvatar } from "../components/UserAvatar.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { ErrorModal } from "../components/ErrorModal.jsx";
import { SuccessModal } from "../components/SuccessModal.jsx";
import { axiosInstance } from "../api/axios.js";

export const JobApplication = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract job details passed from the JobDetails page
    const { jobTitle, companyName } = location.state || {};

    // Form State
    const [resumeOption, setResumeOption] = useState("default");
    const [customResumeLink, setCustomResumeLink] = useState("");
    const [coverLetterLink, setCoverLetterLink] = useState("");
    
    const [isSubmited, setIsSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isLoading) {
        return <Spinner/>
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const payloadResumeLink = resumeOption === "custom" ? customResumeLink : undefined;
        const payloadCoverLetter = coverLetterLink.trim() === "" ? undefined : coverLetterLink;

        try{
            const response = await axiosInstance.post(`/application/apply/${jobId}`, {
                appliedResumeLink: payloadResumeLink,
                coverLetter: payloadCoverLetter,
            });
            if(response.status == 201) {
                setIsLoading(false);
                setIsSubmited(true);
            }
        }
        catch(e){
            console.error("Something went wrong while retriving the job details", e);
            setIsLoading(false);
            setHasError(true);
        }
        finally{
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">

            <ErrorModal 
                isOpen={hasError} 
                onClose={() => setHasError(false)} 
                errMsg="Failed to submit application."
            />

            <SuccessModal 
                isOpen={isSubmited} 
                onClose={() => navigate(-1)} 
                successMsg="Your application has been submitted..."
            />
            
            {/* Dynamic Job Context Header */}
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Application</h1>
                {jobTitle ? (
                    <div className="flex items-center gap-2 text-gray-600">
                        <span>Applying for</span>
                        <span className="font-semibold text-[#256a5e] capitalize">{jobTitle}</span>
                        <span>at</span>
                        <span className="font-semibold capitalize">{companyName}</span>
                    </div>
                ) : (
                    <p className="text-gray-500">Please complete the details below to apply.</p>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: The Form */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        
                        {/* Resume Selection */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Resume Link</h2>
                            
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input 
                                        type="radio" 
                                        name="resume" 
                                        value="default"
                                        checked={resumeOption === "default"}
                                        onChange={() => setResumeOption("default")}
                                        className="w-4 h-4 text-[#256a5e] focus:ring-[#256a5e]"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">Use Profile Resume</p>
                                        <p className="text-sm text-gray-500">We'll use the default resume saved in your settings.</p>
                                    </div>
                                </label>

                                <label className="flex flex-col gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="radio" 
                                            name="resume" 
                                            value="custom"
                                            checked={resumeOption === "custom"}
                                            onChange={() => setResumeOption("custom")}
                                            className="w-4 h-4 text-[#256a5e] focus:ring-[#256a5e]"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">Provide Custom Resume Link</p>
                                            <p className="text-sm text-gray-500">Link to a specific resume (Google Drive, Portfolio, etc.)</p>
                                        </div>
                                    </div>
                                    
                                    {resumeOption === "custom" && (
                                        <input 
                                            type="url"
                                            placeholder="https://..."
                                            value={customResumeLink}
                                            onChange={(e) => setCustomResumeLink(e.target.value)}
                                            className="mt-2 ml-7 p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                                            required
                                        />
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Cover Letter Link */}
                        <div className="mb-8 border-t pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Cover Letter Link (Optional)</h2>
                            <p className="text-sm text-gray-500 mb-3">Have a cover letter on Google Docs or Notion? Paste the link below.</p>
                            <input 
                                type="url"
                                placeholder="https://..."
                                value={coverLetterLink}
                                onChange={(e) => setCoverLetterLink(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#256a5e] focus:border-[#256a5e]"
                            />
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
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Information/Sidebar */}
                <div className="w-full md:w-80 flex flex-col gap-6">
                    
                    {/* User Context Card */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Applying As</h3>
                        
                            <UserAvatar showDetails={true} />
                        
                        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                            Your core profile details and skills will be automatically attached to this application.
                        </p>
                    </div>

                    {/* What Happens Next Card */}
                    <div className="bg-[#f2f9f8] p-6 rounded-xl border border-[#e0f2ef]">
                        <h3 className="text-sm font-bold text-[#1d5349] mb-3 uppercase tracking-wider">What happens next?</h3>
                        <ul className="text-sm text-[#2a6d61] space-y-3">
                            <li className="flex gap-2">
                                <span>1.</span>
                                <span>Your application and match score will be sent directly to the recruiter.</span>
                            </li>
                            <li className="flex gap-2">
                                <span>2.</span>
                                <span>You can track the status of this application in your dashboard.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};