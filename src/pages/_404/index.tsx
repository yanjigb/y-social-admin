import { useNavigate } from 'react-router-dom';

export default function _404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">Page not found</h2>
          <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
