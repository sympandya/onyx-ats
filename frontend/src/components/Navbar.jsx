import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated, user } = useRecoilValue(userState) || {};
  console.log("Current User State:", user);
  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-300">
      <div>
        <Link to="/home" className="font-bold text-2xl">
          Onyx ATS
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/jobs">Explore Jobs</Link>
            <Link to="/signUp">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) :  user?.role === "recruiter" ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/newjob">Post a Job</Link>
            <Link to="/myjobs">Manage Jobs</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) :  user?.role === "candidate" ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/myapplications">My applications</Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) :  user?.role === "admin" ? (
          <>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/Manage">Manage Platform</Link>
            <Link to="/profile">Profile</Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};
