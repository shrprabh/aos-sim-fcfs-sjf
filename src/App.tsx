import React from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import FCFSPage from "./components/FSFSpage"; // Ensure the correct spelling
import SJFPage from "./components/SJFpage"; // Ensure the correct spelling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App: React.FC = () => {
  return (
    <Router>
      <div className="container my-5 py-3">
        <h1 className="text-center mb-3 fw-bold"> {/* Removed display-4 for a standard size and added fw-bold for boldness */}
          Advanced Operating Systems: Scheduling Algorithms Simulation
        </h1>
        <p className="lead text-center mb-4"> {/* Adjusted margins for closer spacing */}
          Explore the functionality of different scheduling algorithms used in operating systems. 
          Learn how First Come, First Served (FCFS) and Shortest Job First (SJF) impact process scheduling and execution.
        </p>
        <Navigation />
        <Routes>
          <Route path="/fcfs" element={<FCFSPage />} />
          <Route path="/sjf" element={<SJFPage />} />
        </Routes>
        <footer className="footer mt-5 py-4 bg-light">
          <div className="container text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Shreyas Prabhakar. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation(); // This ensures useLocation is used within Router context

  return (
    <nav className="mb-4"> {/* Adjusted margin for closer spacing */}
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/fcfs' ? 'active' : ''}`} to="/fcfs">First Come, First Served (FCFS)</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/sjf' ? 'active' : ''}`} to="/sjf">Shortest Job First (SJF)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
