import React, { useState } from 'react';

interface Job {
  id: number;
  job: string;
  arrivalTime: number;
  burstTime: number;
}

interface Props {
  onSubmit: (jobs: Job[], numComputers: number) => void;
}

const JobTable: React.FC<Props> = ({ onSubmit }) => {
  const [jobs, setJobs] = useState<Job[]>([{ id: 1, job: 'Job 1', arrivalTime: 0, burstTime: 0 }]);
  const [numComputers, setNumComputers] = useState<number>(1);

  const addJob = () => {
    const newId = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1;
    setJobs(prevJobs => [...prevJobs, { id: newId, job: `Job ${newId}`, arrivalTime: 0, burstTime: 0 }]);
  };

  const removeJob = (id: number) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  const handleInputChange = (id: number, field: keyof Job, value: string) => {
    setJobs(prevJobs => prevJobs.map(job => job.id === id ? { ...job, [field]: field === 'job' ? value : parseInt(value, 10) } : job));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(jobs, numComputers);
    // Preserves the state, allowing for new submissions without resetting
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" onClick={addJob}>Add Job</button>
        </div>
        <div>
          Number of Computers:
          <input
            type="number"
            value={numComputers}
            onChange={e => setNumComputers(Math.max(1, parseInt(e.target.value, 10)))}
            min={1}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={job.job}
                    onChange={e => handleInputChange(job.id, 'job', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={job.arrivalTime}
                    onChange={e => handleInputChange(job.id, 'arrivalTime', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={job.burstTime}
                    onChange={e => handleInputChange(job.id, 'burstTime', e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => removeJob(job.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobTable;
