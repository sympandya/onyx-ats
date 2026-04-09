import { useEffect, useState } from "react";
import JobCard from "../components/JobCard.jsx";
import { axiosInstance } from "../api/axios.js";
import { Spinner } from "../components/Spinner.jsx";

export const Jobs = ()=>{

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getJobs = async ()=>{
      try{
        setIsLoading(true);
        const response = await axiosInstance.get('/job');
        const jobs = response.data["jobs"];
        setJobs(jobs);
        setIsLoading(false);
      }
      catch(e){
        setIsLoading(false);
        console.error("Error occured while retriving jobs...", e);
      }
    }
    getJobs();
  }, []);
  
  if (isLoading) return <Spinner>Loading jobs...</Spinner>;

  return (
  <div className="max-w-7xl mx-auto p-6">
    <div>
      <h1 className="text-3xl">Explore Career Opportunities</h1>
    </div>
      {jobs.map((job)=>(
        <JobCard jobData={job} key={job._id}></JobCard>
      ))}
  </div>
  );
}