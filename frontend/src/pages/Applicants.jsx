import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";

export const Applicants = ()=>{

    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleStatusUpdate = async (applicationId, newStatus) => {
        const targetApplicant = applicants.find(app => app._id === applicationId);
        if (!targetApplicant) return; 
        const previousStatus = targetApplicant.status;

        setApplicants(prevApplicants => 
            prevApplicants.map(app => 
                app._id === applicationId ? { ...app, status: newStatus } : app
            )
        );

        try {
            await axiosInstance.patch(`/application/status/${applicationId}/update`, {
                status: newStatus
            });
            console.log(`Successfully updated application ${applicationId} to ${newStatus}`);
            
        } catch (e) {
            console.error(`Failed to update status. Reverting ${targetApplicant.candidateId?.name} back to ${previousStatus}...`, e);
            
            setApplicants(prevApplicants => 
                prevApplicants.map(app => 
                    app._id === applicationId ? { ...app, status: previousStatus } : app
                )
            );
        }
    };

    useEffect(()=>{
        const getApplicants = async ()=>{
            try{
                const response = await axiosInstance.get(`/application/${jobId}/applicants`);
                setApplicants(response.data.applications);
                setIsLoading(false);
            }
            catch(e){
                setIsLoading(false);
                console.error("Something went wrong while retriving the job details", e);
            }
        }
        getApplicants();
    }, []);

    if(isLoading) {
        return <Spinner/>
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            
            {/* Header Section */}
            <div className="mb-8 border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applicants</h1>
                    <p className="text-gray-500">Review and manage candidates who applied for this role.</p>
                </div>
                <div className="bg-[#f2f9f8] text-[#1d5349] px-4 py-2 rounded-lg font-medium border border-[#e0f2ef] shadow-sm">
                    Total Applicants: <span className="font-bold">{applicants.length}</span>
                </div>
            </div>

            {/* Main Content Area */}
            {applicants.length === 0 ? (
                <div className="flex flex-col justify-center items-center min-h-[50vh] bg-gray-50 border border-dashed border-gray-300 rounded-xl mx-4">
                    <p className="text-gray-500 text-xl font-medium mb-2">No applicants yet.</p>
                    <p className="text-gray-400 text-sm">When candidates apply, they will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                    <th className="p-5 font-semibold">Candidate</th>
                                    <th className="p-5 font-semibold">Match Score</th>
                                    <th className="p-5 font-semibold">Documents</th>
                                    <th className="p-5 font-semibold">Status</th>
                                    <th className="p-5 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            
                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">
                                {applicants.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                        
                                        {/* 1. Candidate Info (Assuming candidateId is populated) */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#e0f2ef] text-[#256a5e] flex items-center justify-center font-bold uppercase border border-[#c4e4df]">
                                                    {app.candidateId?.name?.charAt(0) || "U"}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 capitalize">
                                                        {app.candidateId?.name || "Unknown User"}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {app.candidateId?.email || "No email available"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 2. Match Score Badge */}
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide
                                                ${app.matchScore >= 80 ? 'bg-green-100 text-green-800' : 
                                                    app.matchScore >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'}
                                            `}>
                                                {app.matchScore}% Match
                                            </span>
                                        </td>

                                        {/* 3. Resume / Cover Letter Links */}
                                        <td className="p-5">
                                            <div className="flex flex-col gap-2">
                                                <a 
                                                    href={app.appliedResumeLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-sm font-medium text-[#256a5e] hover:text-[#1d5349] hover:underline flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                    View Resume
                                                </a>
                                                {app.coverLetter && (
                                                    <a 
                                                        href={app.coverLetter} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-xs text-gray-500 hover:text-gray-800 hover:underline flex items-center gap-1"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                        Cover Letter
                                                    </a>
                                                )}
                                            </div>
                                        </td>

                                        {/* 4. Dynamic Status Dropdown */}
                                        <td className="p-5">
                                            <select 
                                                value={app.status}
                                                onChange={(e) => {
                                                    handleStatusUpdate(app._id, e.target.value)
                                                    console.log(`Update ${app._id} to ${e.target.value}`);
                                                }}
                                                className={`text-sm font-medium rounded-md px-3 py-1.5 cursor-pointer border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#256a5e] transition-colors
                                                    ${app.status === 'Pending' ? 'bg-gray-50 text-gray-700 border-gray-300' : ''}
                                                    ${app.status === 'Interviewing' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                                    ${app.status === 'Shortlisted' ? 'bg-[#f2f9f8] text-[#1d5349] border-[#c4e4df]' : ''}
                                                    ${app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                                `}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Interviewing">Interviewing</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>

                                        {/* 5. Action Buttons */}
                                        <td className="p-5 text-right">
                                            <button className="text-sm font-semibold text-[#256a5e] hover:text-[#1d5349] transition-colors">
                                                Review Details &rarr;
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}