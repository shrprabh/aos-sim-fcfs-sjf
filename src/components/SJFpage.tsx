import React, { useState, useEffect, useRef } from 'react';
import JobTable from './JobTable';
import Chart, { ChartType } from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const SJFPage: React.FC = () => {
  const [jobResults, setJobResults] = useState<any[]>([]);
  const [turnaroundTimeAverage, setTurnaroundTimeAverage] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (jobResults.length > 0) {
      renderGanttChart(jobResults);
    }
  }, [jobResults]);

  const handleSubmit = (jobs: any[], numComputers: number) => {
    // Calculate job results using SJF algorithm
    calculateJobResults(jobs, numComputers);
  };

  const calculateJobResults = (jobs: any[], numComputers: number) => {
    let totalTurnaroundTime = 0;
    const results: any[] = [];
    const currentTimes: number[] = new Array(numComputers).fill(0);
    const waitingJobs: any[] = [];

    // Sort jobs based on arrival time initially
    jobs.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (jobs.length > 0 || waitingJobs.length > 0) {
      // Move jobs to waiting queue if they have arrived
      while (jobs.length > 0 && jobs[0].arrivalTime <= Math.min(...currentTimes)) {
        waitingJobs.push(jobs.shift());
      }

      // Sort waiting jobs based on burst time for SJF
      waitingJobs.sort((a, b) => parseInt(a.burstTime, 10) - parseInt(b.burstTime, 10));

      if (waitingJobs.length > 0) {
        for (let cpu = 0; cpu < numComputers && waitingJobs.length > 0; cpu++) {
          if (currentTimes[cpu] <= Math.min(...currentTimes)) {
            const job = waitingJobs.shift(); // Get the shortest job
            const startTime = Math.max(job.arrivalTime, currentTimes[cpu]);
            const endTime = startTime + parseInt(job.burstTime, 10);
            const turnaroundTime = endTime - parseInt(job.arrivalTime, 10);

            totalTurnaroundTime += turnaroundTime;
            currentTimes[cpu] = endTime;

            results.push({
              ...job,
              startTime,
              endTime,
              turnaroundTime,
              cpu,
            });
          }
        }
      } else {
        // No job is ready to be executed; advance time to next job arrival
        const nextArrivalTime = jobs.length > 0 ? jobs[0].arrivalTime : Number.MAX_SAFE_INTEGER;
        const minCurrentTime = Math.min(...currentTimes);
        if (nextArrivalTime > minCurrentTime) {
          const nextCPU = currentTimes.indexOf(minCurrentTime);
          currentTimes[nextCPU] = nextArrivalTime;
        }
      }
    }

    const averageTurnaroundTime = totalTurnaroundTime / results.length;
    setTurnaroundTimeAverage(averageTurnaroundTime);
    setJobResults(results);
  };

  // The renderGanttChart function remains the same as in your FCFSPage component
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
  const downloadChart = () => {
    if (chartRef.current) {
      const url = chartRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'gantt-chart.png';
      link.href = url;
      link.click();
    }
  };
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center mb-4">Shortest Job First (SJF)</h2>
          <JobTable onSubmit={handleSubmit} />
          {jobResults.length > 0 && (
            <>
              <h3 className="mt-3">Gantt Chart</h3>
              <div style={{ overflowX: 'auto' }}> {/* Make chart scrollable */}
                <canvas id="ganttChart" ref={chartRef} />
              </div>
              <button className="btn btn-primary btn-white-text mt-3" onClick={downloadChart}>Download Chart</button>
              <div className="results-table mt-4">
                <h3>Job Results</h3>
                <table className="table table-striped">
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

export default SJFPage;