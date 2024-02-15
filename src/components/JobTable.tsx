import React, { useState, useEffect } from 'react';

interface Job {
  [key: string]: string | number;
}

interface Props {
  onSubmit: (jobs: Job[], numComputers: number) => void;
}

const JobTable: React.FC<Props> = ({ onSubmit }) => {
  const [numJobs, setNumJobs] = useState<number>(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [numComputers, setNumComputers] = useState<number>(1);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [numJobsError, setNumJobsError] = useState<string | null>(null);
  const [numComputersError, setNumComputersError] = useState<string | null>(null);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [numJobs, jobs, numComputers]);

  const validateForm = () => {
    // Check if any job fields are empty
    for (let i = 0; i < numJobs; i++) {
      if (
        !jobs[i]?.job ||
        !jobs[i]?.arrivalTime ||
        !jobs[i]?.burstTime ||
        jobs[i]?.job === '' ||
        isNaN(Number(jobs[i]?.arrivalTime)) ||
        isNaN(Number(jobs[i]?.burstTime))
      ) {
        return false;
      }
    }
    // Check if number of computers is valid
    return numComputers >= 1;
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newJobs = [...jobs];
    if (!newJobs[index]) {
      newJobs[index] = {};
    }
    newJobs[index][name as keyof Job] = value;
    setJobs(newJobs);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(jobs, numComputers);
  };

  const handleNumJobsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      if (value < 1) {
        setNumJobs(1);
      } else if (value > 100) {
        setNumJobsError('Number of jobs cannot exceed 100');
      } else {
        setNumJobs(value);
        setNumJobsError(null);
      }
    } else {
      // Handle case where input value cannot be parsed into a number
      setNumJobsError('Please enter a valid number');
    }
  };

  const handleNumComputersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 1) {
      // If the parsed value is NaN or less than 1, set it to 1
      value = 1;
      // Set error message
      setNumComputersError('Number of computers cannot be less than 1.');
    } else if (value > 100) {
      // If the value exceeds 100, set it to 100
      value = 100;
      // Set error message
      setNumComputersError('Number of computers cannot exceed 100.');
    } else {
      // Clear error message if value is valid
      setNumComputersError(null);
    }
    setNumComputers(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Jobs:
          <input
            type="number"
            value={numJobs}
            onChange={handleNumJobsChange}
            min={1}
            max={100}
            style={{ borderColor: numJobsError ? 'red' : undefined }}
          />
          {numJobsError && <span style={{ color: 'red' }}>{numJobsError}</span>}
        </label>
        {numJobs > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: numJobs }, (_, index) => (
                  <tr key={index}>
                    <td>
                      <input type="text" name="job" onChange={(event) => handleInputChange(index, event)} />
                    </td>
                    <td>
                      <input type="number" name="arrivalTime" onChange={(event) => handleInputChange(index, event)} />
                    </td>
                    <td>
                      <input type="number" name="burstTime" onChange={(event) => handleInputChange(index, event)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <label>
              Number of Computers:
              <input type="number" value={numComputers} onChange={handleNumComputersChange} />
              {numComputersError && <span style={{ color: 'red' }}>{numComputersError}</span>}
            </label>
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default JobTable;
