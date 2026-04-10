export const SuccessModal = ({ isOpen, onClose, successMsg }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 transition-opacity">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center transform transition-all">
                
                {/* Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50 mb-4">
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                {/* Text Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Success
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                    {successMsg || "Your action was completed successfully."}
                </p>
                
                {/* Button */}
                <button 
                    onClick={onClose}
                    className="w-full rounded-md px-4 py-2.5 bg-[#22c55e] text-white font-medium hover:bg-[#16a34a] transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    OK
                </button>
                
            </div>
        </div>
    );
};