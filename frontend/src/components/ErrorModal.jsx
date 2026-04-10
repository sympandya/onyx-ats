export const ErrorModal = ({ isOpen, onClose, errMsg }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500/75 transition-opacity">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center transform transition-all">
                
                {/* Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 mb-4">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                
                {/* Text Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Error
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                    {errMsg || "There was an error processing your request."}
                </p>
                
                {/* Button */}
                <button 
                    onClick={onClose}
                    className="w-full rounded-md px-4 py-2.5 bg-[#cb4335] text-white font-medium hover:bg-[#b03a2e] transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    OK
                </button>
                
            </div>
        </div>
    );
};