import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState.js";

export const UserAvatar = ({ showDetails = false }) => {
    // Read the current state from the atom
    const { user, isAuthenticated, isLoading } = useRecoilValue(userState); 

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return "U"; 
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    // Handle loading state gracefully (optional, but good UX)
    if (isLoading) {
        return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>;
    }

    // If not authenticated or no user data exists, don't render the avatar
    if (!isAuthenticated || !user) return null; 

    return (
        <div className="flex items-center gap-3">
            {/* The Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-[#256a5e] text-white flex items-center justify-center font-bold shadow-sm">
                {getInitials(user.name)}
            </div>
            
            {/* Conditionally render the name and email */}
            {showDetails && (
                <div>
                    <p className="font-medium text-gray-900 text-sm capitalize">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
            )}
        </div>
    );
};