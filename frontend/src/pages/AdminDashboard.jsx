import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { Spinner } from "../components/Spinner.jsx";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
    const [stats, setStats] = useState({ userCount: 0, jobsCount: 0, applicationCount: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get('/admin/');
                setStats(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error("Failed to fetch stats", e);
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Metric,Count\n"
            + `Total Users,${stats.userCount}\n`
            + `Total Jobs,${stats.jobsCount}\n`
            + `Total Applications,${stats.applicationCount}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "onyx_platform_stats.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="mb-8 border-b border-gray-200 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Overview</h1>
                    <p className="text-gray-500">Monitor Onyx system metrics and health.</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/admin/manage" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Manage Users
                    </Link>
                    <button 
                        onClick={downloadCSV}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#256a5e] rounded-lg hover:bg-[#1d5349] flex items-center gap-2"
                    >
                        Download CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Cards */}
                <div className="bg-[#f2f9f8] border border-[#c4e4df] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-[#1d5349] mb-1">Total Users</h3>
                    <p className="text-4xl font-bold text-[#256a5e]">{stats.userCount}</p>
                </div>
                <div className="bg-[#f2f9f8] border border-[#c4e4df] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-[#1d5349] mb-1">Total Jobs Posted</h3>
                    <p className="text-4xl font-bold text-[#256a5e]">{stats.jobsCount}</p>
                </div>
                <div className="bg-[#f2f9f8] border border-[#c4e4df] rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-[#1d5349] mb-1">Total Applications</h3>
                    <p className="text-4xl font-bold text-[#256a5e]">{stats.applicationCount}</p>
                </div>
            </div>
        </div>
    );
};