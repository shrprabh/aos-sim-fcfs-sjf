import React, { useState, useEffect, useRef } from 'react';
import JobTable from './JobTable';
import Chart, { ChartType } from 'chart.js/auto';

const SJFPage: React.FC = () => {
  const [jobResults, setJobResults] = useState<any[]>([]);
  const [averageWaitingTime, setAverageWaitingTime] = useState<number | null>(null);
  const [averageTurnaroundTime, setAverageTurnaroundTime] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (jobResults.length > 0) {
      renderGanttChart(jobResults);
      calculateAverages(jobResults);
    }
  }, [jobResults]);

  const handleSubmit = (jobs: any[]) => {
    // Sort jobs based on arrival time
    jobs.sort((a, b) => parseInt(a.arrivalTime) - parseInt(b.arrivalTime));

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    const completedProcesses: any[] = [];

    for (const job of jobs) {
      // Skip to the next process if it hasn't arrived yet
      if (parseInt(job.arrivalTime) > currentTime) {
        currentTime = parseInt(job.arrivalTime);
      }

      // Calculate waiting time
      const waitingTime = currentTime - parseInt(job.arrivalTime);
      totalWaitingTime += waitingTime;

      // Execute the process
      currentTime += parseInt(job.burstTime);

      // Calculate turnaround time (using original burst time)
      const turnaroundTime = currentTime - parseInt(job.arrivalTime) - parseInt(job.burstTime);
      totalTurnaroundTime += turnaroundTime;

      // Add process to completed list
      completedProcesses.push({
        ...job,
        completionTime: currentTime,
        waitingTime,
        turnaroundTime,
      });
    }

    // Set state
    setJobResults(completedProcesses);
  };

  const calculateAverages = (results: any[]) => {
    const numProcesses = results.length;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    for (const result of results) {
      totalWaitingTime += result.waitingTime;
      totalTurnaroundTime += result.turnaroundTime;
    }

    const avgWaitingTime = totalWaitingTime / numProcesses;
    const avgTurnaroundTime = totalTurnaroundTime / numProcesses;

    // Set state
    setAverageWaitingTime(avgWaitingTime);
    setAverageTurnaroundTime(avgTurnaroundTime);
  };

  const renderGanttChart = (results: any[]) => {
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
        backgroundColor: color,
        borderWidth: 1,
        data: [{
          x: parseInt(job.arrivalTime),
          y: index + 1
        }, {
          x: job.completionTime,
          y: index + 1
        }],
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
              type: 'category',
              position: 'left',
              labels: results.map((job, index) => job.job),
            },
          },
        },
      });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h2>Shortest Job First (SJF)</h2>
        <JobTable onSubmit={handleSubmit} />
        {jobResults.length > 0 && (
          <div className="results-table">
            <h3>Job Results</h3>
            <table>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                  <th>Completion Time</th>
                  <th>Waiting Time</th>
                  <th>Turnaround Time</th>
                </tr>
              </thead>
              <tbody>
                {jobResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.job}</td>
                    <td>{parseInt(result.arrivalTime)}</td>
                    <td>{result.burstTime}</td>
                    <td>{result.completionTime}</td>
                    <td>{result.waitingTime}</td>
                    <td>{result.turnaroundTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Average Waiting Time: {averageWaitingTime}</p>
            <p>Average Turnaround Time: {averageTurnaroundTime}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Gantt Chart</h3>
        <canvas id="ganttChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default SJFPage;
