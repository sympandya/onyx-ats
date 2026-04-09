import { useEffect } from "react";
import { userState } from "../atoms/userState.js";
import { useSetRecoilState } from "recoil";
import { axiosInstance } from "../api/axios";

export const useAuth = ()=>{

    const setUserState = useSetRecoilState(userState);
    
    useEffect(()=>{
        
        const verifyUser = async ()=>{

            const token = localStorage.getItem("token");
            if(!token) {
                setUserState({ isAuthenticated: false, user: null, isLoading: false }); 
                return
            }
        
            try {
                const response = await axiosInstance.get('/user/me');
                const data = response.data;
                
                setUserState({
                    isAuthenticated: true,
                    user: data.user,
                    isLoading: false
                });
            }
            catch (e) {
                setUserState({ isAuthenticated: false, user: null, isLoading: false }); 
                console.error(e);
                localStorage.removeItem("token");
            }
        }
        verifyUser();
    }, []);
}