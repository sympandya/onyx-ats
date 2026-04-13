import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [fullName, setFullName] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setValidationErrors([]);

        try{
            const respone = await axios.post("http://localhost:8000/api/auth/signup", {
                email, password, name: fullName, role: userRole
            });
            if(respone.status === 201){
                navigate('/login');
            }
        }
        catch (e) {
            if (e.response?.data?.errors) {
                setValidationErrors(e.response.data.errors);
            } else if (e.response?.data?.msg) {
                setValidationErrors([e.response.data.msg]);
            } else {
                setValidationErrors(["An unexpected network error occurred."]);
            }
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {validationErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-bold text-red-800 mb-1">Please fix the following errors:</h3>
                            <ul className="list-disc pl-4 text-sm text-red-700 space-y-1">
                                {validationErrors.map((err, index) => (
                                    <li key={index}>{err.message || err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input value={email} id="email" type="email" name="email" onChange={e=>setEmail(e.target.value)} required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input value={password} id="password" type="password" name="password" onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                        </div>
                        <div className="mt-2">
                            <input value={fullName} id="fullName" type="text" name="fullName" onChange={e=>setFullName(e.target.value)} required autoComplete="name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <select name="Role" id="userRole" value={userRole} onChange={e=> setUserRole(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-sm/6 placeholder:font-medium placeholder:text-gray-900 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center">
                            <option value="" disabled hidden required>--Choose Your Role--</option>
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-600">
                Already a member?
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1.5">Login</Link>
                </p>
            </div>
        </div>

    )
}

