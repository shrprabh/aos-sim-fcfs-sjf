import React, { useState, useEffect, useRef } from 'react';
import JobTable from './JobTable';
import Chart, { ChartType, ChartData, ChartDataset } from 'chart.js/auto';

const SJFPage: React.FC = () => {
  const [jobResults, setJobResults] = useState<any[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (jobResults.length > 0) {
      renderGanttChart(jobResults);
    }
  }, [jobResults]);

  const handleSubmit = (jobs: any[], numComputers: number) => {
    // Calculate job results using SJF algorithm
    const results = calculateJobResults(jobs, numComputers);
    setJobResults(results);
  };

  const calculateJobResults = (jobs: any[], numComputers: number) => {
    let totalTurnaroundTime = 0;
    const results: any[] = [];
    const currentTimes: number[] = new Array(numComputers).fill(0);

    jobs.sort((a, b) => parseInt(a.burstTime, 10) - parseInt(b.burstTime, 10));

    for (const job of jobs) {
      let nextAvailableCPU = currentTimes.indexOf(Math.min(...currentTimes));

      const startTime = Math.max(job.arrivalTime, currentTimes[nextAvailableCPU]);
      const endTime = startTime + parseInt(job.burstTime, 10);
      const turnaroundTime = endTime - parseInt(job.arrivalTime, 10);

      totalTurnaroundTime += turnaroundTime;

      currentTimes[nextAvailableCPU] = endTime;

      results.push({
        ...job,
        startTime,
        endTime,
        turnaroundTime,
        cpu: nextAvailableCPU,
      });
    }

    return results;
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

    const datasets: ChartDataset[] = [];

    results.forEach((job, index) => {
      const colorIndex = index % colors.length;
      const color = colors[colorIndex];
      datasets.push({
        label: `Job ${job.job}`,
        borderColor: color,
        borderWidth: 2,
        data: [{ x: job.startTime, y: job.cpu }, { x: job.endTime, y: job.cpu }],
        fill: false,
      });
    });

    const data: ChartData = {
      datasets: datasets,
    };

    const ctx = chartRef.current;

    if (ctx) {
      Chart.getChart(ctx)?.destroy();

      new Chart(ctx, {
        type: 'line' as ChartType,
        data: data,
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
              max: numComputers,
              ticks: {
                stepSize: 1,
                callback: (value: any) => `CPU ${value + 1}`,
              },
            },
          },
        },
      });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>Shortest Job First (SJF)</h2>
        <JobTable onSubmit={handleSubmit} />
      </div>
      <div style={{ flex: 1 }}>
        {jobResults.length > 0 && (
          <div>
            <h3>Gantt Chart</h3>
            <canvas id="ganttChart" ref={chartRef} />
          </div>
        )}
        {jobResults.length > 0 && (
          <div className="results-table">
            <h3>Job Results</h3>
            <table>
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
            {/* <p>Average Turnaround Time: {turnaroundTimeAverage}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SJFPage;
