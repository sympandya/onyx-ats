import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { Spinner } from "../components/Spinner.jsx";
import { Link } from "react-router-dom";

export const AdminManage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/admin/users');
                setUsers(response.data.users);
                setIsLoading(false);
            } catch (e) {
                console.error("Failed to fetch users", e);
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId) => {
        try {
            await axiosInstance.patch(`/admin/toggleUser/${userId}`);
            
            setUsers(prevUsers => 
                prevUsers.map(u => 
                    u._id === userId ? { ...u, isActive: !u.isActive } : u
                )
            );
        } catch (e) {
            console.error("Failed to toggle status", e);
            alert("Backend Error 500: Check your VS Code terminal to see why the server crashed.");
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="mb-8 border-b border-gray-200 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
                    <p className="text-gray-500">Suspend or activate candidate and recruiter accounts.</p>
                </div>
                <Link to="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="p-5 font-semibold">User Details</th>
                                <th className="p-5 font-semibold">Role</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-5">
                                        <p className="font-semibold text-gray-900 capitalize">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </td>
                                    <td className="p-5 capitalize text-sm font-medium text-gray-600">
                                        {user.role}
                                    </td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.isActive ? 'Active' : 'Suspended'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        {user.role !== 'admin' && (
                                            <button 
                                                onClick={() => handleToggleStatus(user._id)}
                                                className={`px-4 py-1.5 text-sm font-medium border rounded-md transition-colors ${
                                                    user.isActive 
                                                    ? 'text-red-700 border-red-200 hover:bg-red-50' 
                                                    : 'text-[#256a5e] border-[#c4e4df] hover:bg-[#f2f9f8]'
                                                }`}
                                            >
                                                {user.isActive ? 'Block User' : 'Unblock User'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};