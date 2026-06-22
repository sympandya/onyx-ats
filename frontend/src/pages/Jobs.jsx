import { useEffect, useState } from "react";
import JobCard from "../components/JobCard.jsx";
import { axiosInstance } from "../api/axios.js";
import { Spinner } from "../components/Spinner.jsx";
import { Pagination } from "../components/Pagination.jsx"; 

export const Jobs = ()=>{

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (searchQuery = "", page = 1) => {
    try {
      setIsLoading(true);
      let endpoint = `/job?page=${page}&limit=5`;
      if (searchQuery) endpoint += `&keyword=${searchQuery}`;
      
      const response = await axiosInstance.get(endpoint);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages || 1);
      setIsLoading(false);
    } catch(e) {
      setIsLoading(false);
      console.error("Error occured while retriving jobs...", e);
    }
  };
  
  const executeSearch = () => {
    setCurrentPage(1);
    fetchJobs(searchInput, 1);
  }

  useEffect(()=>{
    fetchJobs(searchInput, currentPage); 
  }, [currentPage]);
  
  if (isLoading) return <Spinner/>;

  return (
  <div className="max-w-7xl mx-auto p-6">
    
    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold">Explore Career Opportunities</h1>
      <div className="flex w-full md:w-auto gap-2">
        <input 
          type="text" 
          placeholder="Search roles, location, skills..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#256a5e] focus:ring-1 focus:ring-[#256a5e]"
        />
        <button 
          onClick={executeSearch} 
          className="px-6 py-2 bg-[#256a5e] text-white font-medium rounded-lg hover:bg-[#1d5349] transition-colors"
        >
          Search
        </button>
      </div>
    </div>

      {jobs.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl bg-gray-50 mt-4">
            <p className="text-gray-500 text-lg font-medium">No jobs found matching your search.</p>
        </div>
      ) : (
        <>
            {jobs.map((job)=>(
                <JobCard jobData={job} key={job._id}></JobCard>
            ))}
            
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(newPage) => setCurrentPage(newPage)} 
            />
        </>
      )}
  </div>
  );
}