import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { userState } from "../atoms/userState";
import { useSetRecoilState } from "recoil";

export const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [validationErrors, setValidationErrors] = useState([]);
    const setUserState = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setValidationErrors([]);
        setIsSubmitting(true);

        try{
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email, password
            });
            
            const backendUser = response.data.user;
            const normalizedUser = {
                ...backendUser,
                name: backendUser.fullName 
            };

            setUserState({
                isAuthenticated: true,
                user: normalizedUser
            });

            localStorage.setItem("token", response.data.token);

            if (normalizedUser.role === "recruiter") {
                navigate('/recruiter/dashboard');
            } else {
                navigate('/candidate/dashboard');
            }
        } 
        catch (e) {
            setIsSubmitting(false);
            
            if (e.response?.data?.errors?.issues) {
                setValidationErrors(e.response.data.errors.issues);
            } 
            else if (e.response?.data?.msg) {
                setValidationErrors([e.response.data.msg]);
            } 
            else {
                setValidationErrors(["An unexpected network error occurred."]);
            }
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                {validationErrors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm animate-in fade-in duration-300">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-bold text-red-800 mb-1 text-left">Please fix the following:</h3>
                                <ul className="list-disc pl-4 text-sm text-red-700 space-y-1 text-left">
                                    {validationErrors.map((err, index) => (
                                        <li key={index}>{err.message || err}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                        <input value={email} type="email" onChange={e=>setEmail(e.target.value)} required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        <div className="mt-2">
                        <input value={password} type="password" onChange={e=>setPassword(e.target.value)} required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm" />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-70">
                        {isSubmitting ? "Authenticating..." : "Login"}
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-600">
                    Not a member? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}