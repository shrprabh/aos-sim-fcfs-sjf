import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FCFSPage from "./components/FSFSpage"; // Corrected the file name based on your comment
import SJFPage from "./components/SJFpage";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Advanced Operating Systems FCFS and Shortest Job First Simulation</h1>
        <nav>
          <ul>
            <li>
              <Link to="/fcfs">FCFS Page</Link>
            </li>
            <li>
              <Link to="/sjf">SJF Page</Link>
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
