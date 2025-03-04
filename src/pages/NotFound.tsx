
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-600 mb-6 mt-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          We couldn't find the page you're looking for. The URL may be misspelled or the page you're looking for is no longer available.
        </p>
        <a href="/" className="px-4 py-2 bg-budget-blue text-white rounded-md hover:bg-blue-600 transition-colors">
          Return to Home
        </a>
      </div>
    </MainLayout>
  );
};

export default NotFound;
