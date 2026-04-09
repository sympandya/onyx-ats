import { Navigate, Outlet } from "react-router-dom";
import { userState } from "./../atoms/userState.js"
import { useRecoilValue } from "recoil";
import { Spinner } from "./Spinner.jsx";
import { UnAuthorized } from "../pages/UnAuthorized.jsx";

export const ProtectedRoute = ({allowedRoles})=>{

    const user = useRecoilValue(userState);

    if(user.isLoading) return <Spinner />
    if(!user.isAuthenticated) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (allowedRoles && !allowedRoles.includes(user.user?.role)) {
        return <UnAuthorized />
    }
    else{
        return <Outlet />
    }
}