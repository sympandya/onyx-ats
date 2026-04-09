import { Navigate, Outlet } from "react-router-dom";
import { userState } from "./../atoms/userState.js"
import { useRecoilValue } from "recoil";

export const ProtectedRoute = ()=>{

    const user = useRecoilValue(userState);
    if(!user.isAuthenticated) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    else{
        return <Outlet />;
    }
}