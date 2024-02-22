import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import FCFSPage from "./components/FSFSpage"; // Ensure correct spelling
import SJFPage from "./components/SJFpage";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mt-5"> {/* Use Bootstrap container for alignment and spacing */}
        <h1 className="text-center mb-4"> {/* Center the heading and add margin-bottom */}
          Advanced Operating Systems FCFS and Shortest Job First Simulation
        </h1>
        <nav className="mb-4"> {/* Add margin-bottom to nav */}
          <ul className="nav nav-pills justify-content-center"> {/* Use Bootstrap nav and nav-pills classes */}
            <li className="nav-item">
              <Link className="nav-link" to="/fcfs">FCFS Page</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sjf">SJF Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/fcfs" element={<FCFSPage />} />
          <Route path="/sjf" element={<SJFPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
