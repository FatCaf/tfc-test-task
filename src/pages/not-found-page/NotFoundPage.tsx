import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">
                Oops! The page you are looking for does not exist.
            </p>
            <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </button>
        </div>
    );
};
