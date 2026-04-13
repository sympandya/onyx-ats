import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";
import { Link } from "react-router-dom";

export const CandidateDashboard = () => {
    const { user } = useRecoilValue(userState) || {};
    
    // Real Data Checks from Recoil State
    const hasSkills = user?.skills && user.skills.length > 0;
    const hasResume = !!user?.defaultResumeLink;
    const profileNeedsAttention = !hasSkills || !hasResume;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 min-h-[calc(100vh-80px)] bg-gray-50/50">
            
            {/* Header Area */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Welcome, {user?.name?.split(' ')[0] || "Candidate"}.
                    </h1>
                    <p className="text-gray-500 text-lg">Here is your personal job search command center.</p>
                </div>
                <Link 
                    to="/jobs" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#0d1b2a] text-white font-semibold rounded-lg hover:bg-[#1a2b40] transition-colors shadow-sm"
                >
                    Explore Open Roles &rarr;
                </Link>
            </div>

            {/* Dynamic Alert based on REAL profile data */}
            {profileNeedsAttention && (
                <div className="mb-8 p-5 bg-[#f2f9f8] border border-[#c4e4df] rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-[#256a5e] rounded-lg text-white mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[#1d5349] font-bold">Your profile is incomplete</h3>
                        <p className="text-[#2a6d61] text-sm mt-1 mb-3">Recruiters are 3x more likely to notice profiles with a resume and listed skills.</p>
                        <div className="flex gap-4 text-sm font-medium">
                            {!hasResume && <span className="text-[#256a5e]">&times; Missing Resume</span>}
                            {!hasSkills && <span className="text-[#256a5e]">&times; Missing Skills</span>}
                        </div>
                    </div>
                    <Link to="/candidate/profile" className="px-4 py-2 bg-white text-[#256a5e] font-semibold border border-[#c4e4df] rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Update Profile
                    </Link>
                </div>
            )}

            {/* Core Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Applications Card */}
                <Link to="/candidate/applications" className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#256a5e]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">My Applications</h2>
                    <p className="text-gray-500">Track the status of the jobs you've applied for, view interview schedules, and monitor feedback.</p>
                    <div className="mt-6 flex items-center text-[#256a5e] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        View Applications &rarr;
                    </div>
                </Link>

                {/* Saved Jobs Card */}
                <Link to="/candidate/savedjobs" className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#256a5e]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Saved Jobs</h2>
                    <p className="text-gray-500">Review the opportunities you bookmarked. Don't wait too long—apply before the positions close.</p>
                    <div className="mt-6 flex items-center text-[#256a5e] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        View Saved Board &rarr;
                    </div>
                </Link>

                {/* Profile Management */}
                <Link to="/candidate/profile" className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#256a5e]/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="w-14 h-14 bg-gray-50 text-gray-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Profile & Settings</h2>
                    <p className="text-gray-500">Update your resume, bio, and technical skills to ensure you pass recruiter screening algorithms.</p>
                    <div className="mt-6 flex items-center text-[#256a5e] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Manage Profile &rarr;
                    </div>
                </Link>

                {/* Tools */}
                <div className="group bg-gradient-to-br from-[#256a5e] to-[#1a4a42] p-8 rounded-2xl shadow-md relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Salary Estimator</h2>
                        <p className="text-[#e0f2ef]">Know your worth before the interview. Use real market data to negotiate your next offer.</p>
                    </div>
                    <Link to="/estimator" className="mt-6 inline-block w-fit px-5 py-2.5 bg-white text-[#256a5e] font-bold rounded-lg hover:bg-gray-50 transition-colors">
                        Calculate Now
                    </Link>
                </div>

            </div>
        </div>
    );
};