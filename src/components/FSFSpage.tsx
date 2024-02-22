import React, { useState, useEffect, useRef } from 'react';
import JobTable from './JobTable';
import Chart, { ChartType } from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

const FCFSPage: React.FC = () => {
  const [jobResults, setJobResults] = useState<any[]>([]);
  const [turnaroundTimeAverage, setTurnaroundTimeAverage] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (jobResults.length > 0) {
      renderGanttChart(jobResults);
    }
  }, [jobResults]);

  const handleSubmit = (jobs: any[], numComputers: number) => {
    // Calculate job results using FCFS algorithm
    calculateJobResults(jobs, numComputers);
  };

  const calculateJobResults = (jobs: any[], numComputers: number) => {
    let totalTurnaroundTime = 0;
    const results: any[] = [];

    // Initialize an array to store the current time of each CPU
    const currentTimes: number[] = new Array(numComputers).fill(0);

    // Sort jobs based on arrival time
    jobs.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Iterate through the sorted jobs
    for (const job of jobs) {
      let nextAvailableCPU = 0;
      if (numComputers > 0) {
        // Find the next available CPU
        nextAvailableCPU = currentTimes.indexOf(Math.min(...currentTimes));
      }

      const startTime = Math.max(job.arrivalTime, currentTimes[nextAvailableCPU]);
      const endTime = startTime + parseInt(job.burstTime, 10);
      const turnaroundTime = endTime - parseInt(job.arrivalTime, 10);

      // Update total turnaround time
      totalTurnaroundTime += turnaroundTime;

      // Update current time of the CPU
      currentTimes[nextAvailableCPU] = endTime;

      // Add job result to the list
      results.push({
        ...job,
        startTime,
        endTime,
        turnaroundTime,
        cpu: nextAvailableCPU, // Assign CPU number to the job result
      });
    }

    // Calculate turnaround time average
    const averageTurnaroundTime = totalTurnaroundTime / jobs.length;
    setTurnaroundTimeAverage(averageTurnaroundTime);

    // Update job results state
    setJobResults(results);
  };

  const renderGanttChart = (results: any[]) => {
    const numComputers = Math.max(1, Math.max(...results.map(job => job.cpu)) + 1);
    const colors = [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 206, 86, 1)',
    ];

    const datasets: any[] = [];

    // Create a dataset for each job with a unique color
    results.forEach((job, index) => {
      const colorIndex = index % colors.length; // Get color index cyclically
      const color = colors[colorIndex];
      datasets.push({
        label: job.job,
        borderColor: color,
        borderWidth: 2,
        data: [{ x: job.startTime, y: job.cpu }, { x: job.endTime, y: job.cpu }],
        fill: false,
      });
    });

    const ctx = chartRef.current;

    if (ctx) {
      // Destroy the previous chart if it exists
      Chart.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: 'line' as ChartType,
        data: {
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
              min: -1,
              max: numComputers , // Ensure maximum y-axis range is correct
              ticks: {
                stepSize: 1, // Set step size to 1
                callback: (value: any) => `CPU ${value + 1}`,
              },
            },
          },
        },
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center">First Come First Serve (FCFS)</h2>
          <JobTable onSubmit={handleSubmit} />
          {jobResults.length > 0 && (
            <>
              <h3 className="mt-3">Gantt Chart</h3>
              <canvas id="ganttChart" ref={chartRef} />
              <div className="mt-3">
                <h3>Job Results</h3>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Arrival Time</th>
                      <th>Burst Time</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Turnaround Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.job}</td>
                        <td>{result.arrivalTime}</td>
                        <td>{result.burstTime}</td>
                        <td>{result.startTime}</td>
                        <td>{result.endTime}</td>
                        <td>{result.turnaroundTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Average Turnaround Time: {turnaroundTimeAverage}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default FCFSPage;
