import React from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import FCFSPage from "./components/FSFSpage"; // Make sure the exported component name is FCFSPage in FSFSpage.tsx
import SJFPage from "./components/SJFpage"; // Make sure the exported component name is SJFPage in SJFpage.tsx

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
          <Route path="/fcfs" Component={FCFSPage} />
          <Route path="/sjf" Component={SJFPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
