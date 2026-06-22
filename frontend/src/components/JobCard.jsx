import { Link } from "react-router-dom";
import { userState } from "../atoms/userState";
import { useRecoilValue } from "recoil";

export default function JobCard({ jobData }) {
  const { user } = useRecoilValue(userState) || {};

  // Check if current user is the recruiter who posted this job
  const isJobOwner = user?.role === "recruiter" && user?._id === (jobData.recruiterId?._id || jobData.recruiterId);

  return (
    <div className="group max-w-4xl mx-auto w-full bg-white rounded-xl border border-gray-200 p-5 sm:p-6 mb-4 flex flex-col sm:flex-row sm:items-start gap-4 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300 hover:-translate-y-0.5 relative overflow-hidden">
      
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#256a5e] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

      {/* 1. Logo Section */}
      <Link to={`/job/${jobData._id}`} className="shrink-0">
        <div className="h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm flex items-center justify-center">
          <img
            src={jobData.recruiterId?.companyLogoUrl || "https://static.thenounproject.com/png/1554489-200.png"}
            alt={`${jobData.recruiterId?.companyName || "Company"} logo`}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      {/* 2. Main Content Section */}
      <div className="flex flex-1 flex-col text-left min-w-0">
        
        {/* Title & Company */}
        <div className="mb-1.5">
          <Link 
            to={`/job/${jobData._id}`} 
            className="text-lg font-bold text-gray-900 group-hover:text-[#256a5e] transition-colors truncate block"
          >
            {jobData.title}
          </Link>
          <h3 className="text-sm font-medium text-[#256a5e] opacity-90">
            {jobData.recruiterId?.companyName}
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {jobData.description}
        </p>

        {/* Metadata Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {/* Experience Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#f2f9f8] px-2.5 py-1 text-xs font-semibold text-[#1d5349] border border-[#256a5e]/20">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span className="capitalize">{jobData.experienceLevel}</span>
          </div>

          {/* Salary Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {jobData.salary}
          </div>
        </div>
      </div>

      {/* 3. Action Section (Recruiter Only) */}
      {isJobOwner && (
        <div className="sm:ml-4 sm:shrink-0 mt-3 sm:mt-0 sm:self-center border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 z-10 relative">
          <Link 
            to={`/recruiter/job/${jobData._id}/applicants`}
            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-semibold text-[#256a5e] bg-[#f2f9f8] rounded-lg hover:bg-[#256a5e] hover:text-white transition-colors duration-200"
          >
            View Applicants &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}