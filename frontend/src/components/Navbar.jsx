import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState.js";
import { Link, useNavigate } from "react-router-dom";
import { UserAvatar } from "./UserAvatar.jsx";


export const Navbar = () => {
    const { isAuthenticated, user } = useRecoilValue(userState) || {};
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null); 
        navigate("/login");
    };

    // Hover Dropdown for Resources (Candidate Only)
    const ResourcesDropdown = () => (
        <div className="relative group py-2">
            <span className="cursor-pointer font-medium text-gray-700 hover:text-[#256a5e] transition-colors flex items-center gap-1">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
            <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden">
                <Link to="/resources/blogs" className="px-4 py-3 text-sm text-gray-700 hover:bg-[#f2f9f8] hover:text-[#1d5349] transition-colors">Blogs & Insights</Link>
                <Link to="/resources/salary-estimator" className="px-4 py-3 text-sm text-gray-700 hover:bg-[#f2f9f8] hover:text-[#1d5349] transition-colors">Salary Estimator</Link>
            </div>
        </div>
    );

    // Click Dropdown for Profile
    const ProfileDropdown = ({ profileRoute }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef(null);

        // Close dropdown when clicking outside of it
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div className="relative py-2 ml-2" ref={dropdownRef}>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
                >
                    <UserAvatar showDetails={false} />
                </button>
                
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <Link 
                            to={profileRoute} 
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-sm text-gray-700 hover:bg-[#f2f9f8] hover:text-[#1d5349] border-b border-gray-50 transition-colors"
                        >
                            Edit Profile
                        </Link>
                        <button 
                            onClick={() => { setIsOpen(false); handleLogout(); }} 
                            className="px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50 font-medium transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
            
            {/* Logo */}
            <div>
                <Link to="/" className="font-extrabold text-2xl text-[#0d1b2a] tracking-tight hover:opacity-80 transition-opacity">
                    Onyx<span className="text-[#256a5e]">.</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8 items-center">
                
                {/* 1. PUBLIC VIEW */}
                {!isAuthenticated && (
                    <>
                        <Link to="/jobs" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Explore Jobs</Link>
                        <div className="flex items-center gap-4 ml-4">
                            <Link to="/login" className="font-semibold text-[#256a5e] hover:text-[#1d5349] transition-colors">Log In</Link>
                            <Link to="/signup" className="px-5 py-2.5 bg-[#256a5e] hover:bg-[#1d5349] text-white font-semibold rounded-lg transition-colors shadow-sm">Sign Up</Link>
                        </div>
                    </>
                )}

                {/* 2. RECRUITER VIEW */}
                {isAuthenticated && user?.role === "recruiter" && (
                    <>
                        <Link to="/recruiter/dashboard" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Home</Link>
                        <Link to="/jobs" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Explore</Link>
                        <Link to="/recruiter/postJob" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Post a Job</Link>
                        <Link to="/recruiter/myjobs" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">My Jobs</Link>
                        <ProfileDropdown profileRoute="/recruiter/profile" />
                    </>
                )}

                {/* 3. CANDIDATE VIEW */}
                {isAuthenticated && user?.role === "candidate" && (
                    <>
                        <Link to="/candidate/dashboard" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Home</Link>
                        <Link to="/jobs" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Explore</Link>
                        <Link to="/candidate/applications" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">My Applications</Link>
                        <Link to="/candidate/savedjobs" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Saved</Link>
                        <ResourcesDropdown />
                        <ProfileDropdown profileRoute="/candidate/profile" />
                    </>
                )}

                {/* 4. ADMIN VIEW */}
                {isAuthenticated && user?.role === "admin" && (
                    <>
                        <Link to="/admin/dashboard" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Dashboard</Link>
                        <Link to="/manage" className="font-medium text-gray-700 hover:text-[#256a5e] transition-colors">Manage</Link>
                        <ProfileDropdown profileRoute="/admin/profile" />
                    </>
                )}

            </div>
        </nav>
    );
};