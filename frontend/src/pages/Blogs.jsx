import { useState, useEffect } from 'react';
import { Spinner } from '../components/Spinner.jsx';

export const Blogs = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://dev.to/api/articles?tag=programming&top=7&per_page=9');
                const data = await response.json();
                setArticles(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 min-h-screen">
            {/* Header Section */}
            <div className="mb-10 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Onyx Insights & Engineering</h1>
                <p className="text-gray-500">Latest tutorials, architecture breakdowns, and career advice.</p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <a 
                        key={article.id} 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                        {/* Article Cover Image */}
                        <div className="h-48 overflow-hidden bg-gray-100">
                            <img 
                                src={article.social_image || article.cover_image || "https://via.placeholder.com/800x400?text=Tech+Blog"} 
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        
                        {/* Article Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            {/* Tags */}
                            <div className="flex gap-2 mb-3 overflow-hidden">
                                {article.tag_list.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-[#256a5e] bg-[#e0f2ef] px-2 py-1 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#256a5e] transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                                {article.description}
                            </p>
                            
                            {/* Author Footer */}
                            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
                                <img 
                                    src={article.user.profile_image} 
                                    alt={article.user.name} 
                                    className="w-10 h-10 rounded-full border border-gray-200"
                                />
                                <div className="text-xs">
                                    <p className="font-bold text-gray-900">{article.user.name}</p>
                                    <p className="text-gray-500 text-[11px] mt-0.5">
                                        {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                                        <span className="mx-1">•</span> 
                                        {article.reading_time_minutes} min read
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};