import { useEffect, useState } from "react"
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import JobCard from "../components/JobCard.jsx";

export const MyPostedJobs = ()=>{
    
    const navigate = useNavigate();
    const [myJobs, setMyJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

        const getMyJobs = async()=>{
            try{
                const response = await axiosInstance.get('/job/myJobs');
                setMyJobs(response.data.jobs);
                setIsLoading(false);
            }
            catch(e){
                setIsLoading(false);
                console.error("Something went wrong while retriving the job details", e);
            }
        }
        getMyJobs();

    }, []);

    if(isLoading) <Spinner />

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center ml-12 mr-12 mt-3 mb-6">      
                <h1 className="text-2xl font-bold text-gray-900 mb-2 ml-12 mt-3">My Posted Jobs:</h1>

                <button onClick={() => navigate('/recruiter/postJob')} className="bg-green-800 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors duration-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Post a Job
                </button>
            </div>
                
            {myJobs.length === 0 ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-gray-500 text-xl font-medium">
                        You haven't posted any jobs yet. 
                    </p>
                </div>
            ) : (
                <div className="mt-6">
                    {myJobs.map((job) => {
                        return <JobCard jobData={job} key={job._id}></JobCard>
                    })}
                </div>
            )}
            
            
        </div>
    )
}