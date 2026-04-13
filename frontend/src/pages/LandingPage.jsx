import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";

export const LandingPage = () => {
    // Check if user is logged in to dynamically change the buttons
    const { isAuthenticated, user } = useRecoilValue(userState) || {};

    return (
        <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#e0f2ef]/50 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2f9f8] border border-[#c4e4df] text-[#1d5349] text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#256a5e] animate-pulse"></span>
                    Onyx ATS Beta is Live
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
                    The Smart Way to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#256a5e] to-[#439c8c]">
                        Hire and Get Hired.
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                    Onyx is a next-generation Applicant Tracking System designed to connect top talent with the world's most innovative companies. Fast, clean, and data-driven.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    {!isAuthenticated ? (
                        // Logged Out State
                        <>
                            <Link 
                                to="/jobs" 
                                className="w-full sm:w-auto px-8 py-4 bg-[#256a5e] hover:bg-[#1d5349] text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                            >
                                Find Your Next Job
                            </Link>
                            <Link 
                                to="/signup" 
                                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold border border-gray-200 rounded-lg transition-all duration-200 shadow-sm text-lg"
                            >
                                Post an Opening
                            </Link>
                        </>
                    ) : user?.role === "recruiter" ? (
                        // Recruiter State
                        <>
                            <Link 
                                to="/recruiter/postJob" 
                                className="w-full sm:w-auto px-8 py-4 bg-[#256a5e] hover:bg-[#1d5349] text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                            >
                                Post a New Job
                            </Link>
                            <Link 
                                to="/recruiter/myjobs" 
                                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold border border-gray-200 rounded-lg transition-all duration-200 shadow-sm text-lg"
                            >
                                Manage Candidates
                            </Link>
                        </>
                    ) : (
                        // Candidate State
                        <>
                            <Link 
                                to="/jobs" 
                                className="w-full sm:w-auto px-8 py-4 bg-[#256a5e] hover:bg-[#1d5349] text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                            >
                                Browse Open Roles
                            </Link>
                            <Link 
                                to="/candidate/applications" 
                                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold border border-gray-200 rounded-lg transition-all duration-200 shadow-sm text-lg"
                            >
                                Track Applications
                            </Link>
                        </>
                    )}
                </div>

                {/* Social Proof / Stats */}
                <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-70">
                    <div>
                        <p className="text-3xl font-extrabold text-gray-900">500+</p>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Active Jobs</p>
                    </div>
                    <div>
                        <p className="text-3xl font-extrabold text-gray-900">10k+</p>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Candidates</p>
                    </div>
                    <div>
                        <p className="text-3xl font-extrabold text-gray-900">98%</p>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Match Rate</p>
                    </div>
                    <div>
                        <p className="text-3xl font-extrabold text-gray-900">24h</p>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Avg Response</p>
                    </div>
                </div>

            </div>
        </div>
    );
};