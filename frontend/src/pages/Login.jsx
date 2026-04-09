import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { userState } from "../atoms/userState";
import { useSetRecoilState } from "recoil";

export const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setUserState = useSetRecoilState(userState);
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const respone = await axios.post("http://localhost:8000/api/auth/login", {
                email, password
            });
            console.log(respone.data);
            
            setUserState({
                isAuthenticated: true,
                user: respone.data.user
            });

            localStorage.setItem("token", respone.data.token);

            navigate('/jobs');
        }
        catch(e){
            console.error("Error sending the data!!!", e);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login to your account</h2>
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
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-600">
                Not a member?
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1.5">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}