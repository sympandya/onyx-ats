import { Link } from "react-router-dom";
import { userState } from "../atoms/userState";
import { useRecoilValue } from "recoil";


export default function JobCard({ jobData }) {
  const { user } = useRecoilValue(userState);
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border p-8 text-gray-700 shadow transition hover:shadow-lg sm:flex-row sm:items-start my-5">
      <Link to={`/job/${jobData._id}`} className="mb-4 shrink-0 sm:mb-0 sm:mr-8">
        <div className="group relative h-16 w-16 overflow-hidden rounded-lg border">
          <img
            src={jobData.recruiterId?.companyLogoUrl || "https://static.thenounproject.com/png/1554489-200.png"}
            alt={"logo_here"}
            className="h-full w-full object-cover text-gray-700"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col text-left">
        <Link to={`/job/${jobData._id}`} className="overflow-hidden pr-7 text-lg font-semibold sm:text-xl">
          {jobData.title}
        </Link>
        <h3 className="mb-3 mt-1 text-sm text-gray-600">{jobData.recruiterId.companyName}</h3>

        <p className="overflow-hidden pr-7 text-sm">{jobData.description}</p>

        <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div>
            Experience:
            <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
              {jobData.experienceLevel}
            </span>
          </div>
          <div>
            Salary:
            <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
              {jobData.salary}
            </span>
          </div>
        </div>
      </div>
      {/* Only show this if the user is a recruiter and we are on the dashboard */}
        {user?.role === "recruiter" && (
            <Link 
                to={`/recruiter/job/${jobData._id}/applicants`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-[#256a5e] hover:underline"
            >
                View Applicants →
            </Link>
        )}
    </div>
  );
}