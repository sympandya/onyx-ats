import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios.js";

export const MyApplications = ()=>{

    const [isLoading, setIsLoading] = useState(true);
    const [applications, setApplications] = useState([]);

    useEffect(()=>{
        const getMyApplications = async ()=>{
            try{
                const response = await axiosInstance.get(`application/applied`);
                if(response.status === 200){
                    setApplications(response.data.applications);
                    setIsLoading(false);
                }
            }
            catch(e){
                setIsLoading(false);
                console.error("Error fetching your applications!!", e);
            }
        }
        getMyApplications();
    }, []);

    // Helper function to style status badges dynamically
    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Interviewing":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "Shortlisted":
                return "bg-green-100 text-green-800 border-green-200";
            case "Rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="w-[70%] mx-auto py-10 bg-white min-h-screen">
            {/* --- Header Section --- */}
            <div className="border-b border-gray-100 pb-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Applications
                </h1>
                <p className="text-sm text-gray-500">
                    Track and manage your job applications and interview status.
                </p>
            </div>

            {/* --- Loading State --- */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#256a5e]"></div>
                </div>
            ) : applications.length === 0 ? (
                /* --- Empty State --- */
                <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                    <p className="text-sm text-gray-500">You haven't applied to any jobs yet. Start exploring!</p>
                </div>
            ) : (
                /* --- Applications List --- */
                <div className="flex flex-col gap-6">
                    {applications.map((app) => (
                        <div key={app._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                            
                            {/* Card Header: Job & Company Details */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    {app.jobId?.recruiterId?.companyLogoUrl ? (
                                        <img 
                                            src={app.jobId.recruiterId.companyLogoUrl} 
                                            alt={app.jobId.recruiterId.companyName} 
                                            className="w-14 h-14 rounded-md object-cover border border-gray-100"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">
                                            {app.jobId?.recruiterId?.companyName?.charAt(0) || "C"}
                                        </div>
                                    )}
                                    
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 capitalize mb-1">
                                            {app.jobId?.title || "Job Title Unavailable"}
                                        </h2>
                                        <span className="font-semibold text-[#276e62] text-sm">
                                            {app.jobId?.recruiterId?.companyName || "Company Unavailable"}
                                        </span>
                                    </div>
                                </div>

                                <span className={`px-3 py-1 border rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                                    {app.status}
                                </span>
                            </div>

                            {/* Summary Info Cards (Matching Reference Style) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Applied On</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Match Score</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {app.matchScore ? `${app.matchScore}%` : "Evaluating"}
                                    </p>
                                </div>

                                {/* Conditional: Show Interview Details if Interviewing */}
                                {app.status === "Interviewing" && app.interviewDate && (
                                    <div className="bg-[#f2f9f8] border border-[#276e62]/20 rounded-lg p-4 md:col-span-2 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-[#276e62] mb-1 font-medium">Interview Scheduled</p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {new Date(app.interviewDate).toLocaleDateString()} at {app.interviewTime}
                                            </p>
                                        </div>
                                        {app.interviewLink && (
                                            <a 
                                                href={app.interviewLink} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="px-3 py-1.5 bg-[#256a5e] text-white rounded text-xs font-medium hover:bg-[#1d5349] transition-colors"
                                            >
                                                Join Link
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Conditional: Show Rejection Reason if Rejected */}
                                {app.status === "Rejected" && app.rejectionReason && (
                                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 md:col-span-2">
                                        <p className="text-xs text-red-600 mb-1 font-medium">Feedback</p>
                                        <p className="text-sm font-semibold text-red-900 line-clamp-2">
                                            {app.rejectionReason}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Actions / Footer */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                {app.appliedResumeLink && (
                                    <a 
                                        href={app.appliedResumeLink} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                        View Submitted Resume
                                    </a>
                                )}
                                
                                {app.coverLetter && (
                                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md font-medium">
                                        Cover Letter Attached
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}