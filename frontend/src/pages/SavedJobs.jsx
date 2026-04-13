import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios.js";
import JobCard from "../components/JobCard.jsx";

export const SavedJobs = ()=>{

    const [isLoading, setIsLoading] = useState(true);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(()=>{
        const getMySavedJobs = async ()=>{
            try{
                const response = await axiosInstance.get(`/job/saved-jobs`);
                setSavedJobs(response.data.savedJobs);
                setIsLoading(false);
            }
            catch(e){
                setIsLoading(false);
                console.error("Error fetching your applications!!", e);
            }
        }
        getMySavedJobs();
    }, []);


    return (
        <div className="w-[70%] mx-auto py-10 bg-white min-h-screen">
            {/* --- Header Section --- */}
            <div className="border-b border-gray-100 pb-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Saved Jobs
                </h1>
                <p className="text-sm text-gray-500">
                    Review the jobs you've bookmarked for later.
                </p>
            </div>

            {/* --- Loading State --- */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#256a5e]"></div>
                </div>
            ) : savedJobs.length === 0 ? (
                /* --- Empty State --- */
                <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
                    <p className="text-sm text-gray-500">Jobs you save will appear here so you can apply to them later.</p>
                </div>
            ) : (
                /* --- Saved Jobs List using JobCard --- */
                <div className="flex flex-col">
                    {savedJobs.map((job) => (
                        <JobCard key={job._id} jobData={job} />
                    ))}
                </div>
            )}
        </div>
    )
}