import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { PageNotFound } from "./PageNotFound.jsx";
import { Spinner } from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { SaveJob } from "../components/SaveJob.jsx";

export const JobDetails = ()=>{
    const { jobId } = useParams();
    const { user } = useRecoilValue(userState);
    const [isLoading, setIsLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isJobSaved, setIsJobSaved] = useState(false);
    const navigate = useNavigate();

    const handleSave = async (e) => {
        setIsJobSaved(prev=>!prev);

        try{
            const response = await axiosInstance.post(`job/saved-jobs/${jobId}`);
            if(response.status === 201 || response.status === 200){
                console.log("Bookmark updated succesfully...");
                    return;
            }
        }
        catch(e){
            console.log("Failed to save, reverting UI...");
            setIsJobSaved(prev=>!prev);
            console.error("Something went wrong while adding/removing job to bookmark!!!", e);
            return;
        }
    }
    
    const handleNavigation = () => {
        const job = jobDetails?.foundJob;
        navigate(`/candidate/job/apply/${jobId}`, { 
            state: { 
                jobTitle: job.title, 
                companyName: job.recruiterId?.companyName,
            } 
        });
    }

    useEffect(()=>{
        const getJobDetails = async()=>{
            try{
                const response = await axiosInstance.get(`job/${jobId}`);
                if(!response.data) {
                    setHasError(true);
                    setIsLoading(false);
                    return;
                }
                const jobDetails = response.data;

                if(user.role === "candidate"){
                    const savedResponse = await axiosInstance.get('job/saved-jobs');
                    const savedJobsArray = savedResponse.data.savedJobs || [];
                    const isAlreadySaved = savedJobsArray.some(savedJob => savedJob._id === jobId);
                    setIsJobSaved(isAlreadySaved);
                }

                setIsLoading(false);
                setJobDetails(jobDetails);
            }
            catch(e){
                console.error("Something went wrong while retriving the job details", e);
                setHasError(true);
                setIsLoading(false);
            }
        }
        getJobDetails();
    }, [jobId, user?.role]);

    if (isLoading || !jobDetails) {
        return <Spinner/>
    }
    if (hasError || !jobDetails) {
        return <PageNotFound/>
    }

    const job = jobDetails.foundJob;

    return(
        <div className="w-[70%] mx-auto py-10 bg-white">
            {/* --- Header Section --- */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 capitalize">
                        {job.title}
                    </h1>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        {job.recruiterId?.companyLogoUrl && (
                            <img 
                                src={job.recruiterId.companyLogoUrl} 
                                alt={job.recruiterId.companyName} 
                                className="w-6 h-6 rounded-full object-cover" 
                            />
                        )}
                        <span className="font-semibold text-[#276e62]">
                            {job.recruiterId?.companyName}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{job.location} - {job.workMode}</span>
                    </div>

                    <div className="text-sm text-gray-500">
                        Posted {new Date(job.createdAt).toLocaleDateString()} 
                        <span className="mx-2">•</span> 
                        {job.numOfOpenings} Opening(s)
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 justify-end">
                        {user.role === "candidate" ? (
                            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <SaveJob isJobSaved={isJobSaved}></SaveJob>
                                {isJobSaved ? "Saved" : "Save"}
                            </button>
                        ) : (<></>)}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Share
                        </button>
                    </div>
                    {user.role === "candidate" ? (
                        <button onClick={handleNavigation} className="w-full px-8 py-2.5 bg-[#256a5e] hover:bg-[#1d5349] text-white rounded-md text-sm font-semibold transition-colors">
                            Apply Now
                        </button>
                    ) : (<></>)}
                </div>
            </div>

            {/* --- Summary Info Cards --- */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Experience</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{job.experienceLevel}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Job Type</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{job.jobType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Offer Salary</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">{job.salary}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Status</p>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${job.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{job.status}</p>
                    </div>
                </div>
            </div>

            {/* --- Job Description --- */}
            <div className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                </div>
            </div>

            {/* --- Required Skills --- */}
            {job.requiredSkills && job.requiredSkills.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Requirements and Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}