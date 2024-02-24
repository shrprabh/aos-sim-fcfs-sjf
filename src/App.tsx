import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import FCFSPage from "./components/FSFSpage"; // Corrected the spelling
import SJFPage from "./components/SJFpage";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App: React.FC = () => {
  return (
    <Router>
      <div className="container my-5 py-3">
        <h1 className="display-4 text-center mb-5">
          Advanced Operating Systems: Scheduling Algorithms Simulation
        </h1>
        <p className="lead text-center mb-5">
          Explore the functionality of different scheduling algorithms used in operating systems. 
          Learn how First Come, First Served (FCFS) and Shortest Job First (SJF) impact process scheduling and execution.
        </p>
        <nav className="mb-5">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/fcfs">First Come, First Served (FCFS)</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sjf">Shortest Job First (SJF)</Link>
            </li>
          </ul>
        </nav>

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

export default App;
