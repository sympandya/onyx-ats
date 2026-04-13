import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";
import { Link } from "react-router-dom";

export const RecruiterDashboard = () => {
    const { user } = useRecoilValue(userState) || {};
    
    // Real Data Check
    const hasCompanyDetails = !!user?.companyName && !!user?.companyIndustry;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 min-h-[calc(100vh-80px)] bg-gray-50/50">
            
            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Welcome, {user?.name?.split(' ')[0] || "Recruiter"}.
                    </h1>
                    <p className="text-gray-500 text-lg">Manage your hiring pipeline and source top talent.</p>
                </div>
            </div>

            {/* Action Priority Alert */}
            {!hasCompanyDetails && (
                <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-amber-500 rounded-lg text-white mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-amber-900 font-bold">Complete your Employer Profile</h3>
                        <p className="text-amber-800 text-sm mt-1 mb-2">Candidates are less likely to apply to jobs without a clear company name and description.</p>
                    </div>
                    <Link to="/recruiter/profile" className="px-4 py-2 bg-white text-amber-700 font-semibold border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors text-sm">
                        Setup Profile
                    </Link>
                </div>
            )}

            {/* Core Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Primary Action: Post a Job */}
                <div className="lg:col-span-2 bg-[#0d1b2a] rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg group">
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl mb-6 backdrop-blur-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Create a New Requisition</h2>
                        <p className="text-gray-400 text-lg max-w-md mb-8">
                            Draft a new job posting, define requirements, and instantly publish it to thousands of active candidates on Onyx.
                        </p>
                        <Link 
                            to="/recruiter/postJob" 
                            className="inline-flex px-8 py-4 bg-[#256a5e] hover:bg-[#1d5349] text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                            Post a Job Now
                        </Link>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#256a5e] rounded-tl-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Manage Listings */}
                    <Link to="/recruiter/myjobs" className="group flex-1 bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#256a5e]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Listings</h3>
                        <p className="text-sm text-gray-500 mb-4">Review applicants and update statuses.</p>
                        <span className="text-[#256a5e] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex w-fit">
                            View Dashboard &rarr;
                        </span>
                    </Link>

                    {/* Company Brand */}
                    <Link to="/recruiter/profile" className="group flex-1 bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#256a5e]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Employer Brand</h3>
                        <p className="text-sm text-gray-500 mb-4">Edit company details and logo.</p>
                        <span className="text-[#256a5e] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex w-fit">
                            Edit Profile &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};