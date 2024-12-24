import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
