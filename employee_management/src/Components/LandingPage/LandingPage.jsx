import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate("/employee-management"); 
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the Employee Management System
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your all-in-one solution for managing employee data efficiently and effortlessly.
        </p>
        <div className="space-y-4">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-500">Key Features:</h2>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              <li>Add and manage employee records.</li>
              <li>View detailed employee profiles.</li>
              <li>Edit and update employee information in real-time.</li>
              <li>Generate insightful dashboards and reports.</li>
              <li>Secure and efficient data storage with MongoDB Atlas.</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleGetStartedClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
