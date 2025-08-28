# CPU Scheduling Algorithms Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This project is a simulator for CPU scheduling algorithms, specifically focusing on First-Come-First-Served (FCFS) and Shortest Job First (SJF) algorithms. It provides a practical implementation to visualize and compare the performance metrics of these fundamental operating system scheduling techniques.

## Scheduling Algorithms Implemented

### First-Come-First-Served (FCFS)

FCFS is the simplest scheduling algorithm where processes are executed in the order they arrive in the ready queue.

**Characteristics:**
- Non-preemptive
- Simple to implement
- Can cause convoy effect (short processes wait for long ones)
# Screenshot
<img width="1347" height="1311" alt="image" src="https://github.com/user-attachments/assets/9dbb898d-fb38-4091-bc09-72f7bb2b5747" />

### Shortest Job First (SJF)

SJF selects the process with the smallest execution time to run next.

**Characteristics:**
- Can be either preemptive or non-preemptive
- Optimal for minimizing average waiting time
- Requires knowledge of process execution time in advance

## Features

- Simulation of FCFS and SJF scheduling algorithms
- Calculation of key performance metrics:
  - Average Waiting Time
  - Average Turnaround Time
  - Average Response Time
  - CPU Utilization
- Visualization of process execution timeline
- Comparison between different scheduling algorithms
- Customizable process arrival and burst times
## Screenshots
<img width="991" height="1295" alt="Screenshot 2025-08-27 at 7 47 50 PM" src="https://github.com/user-attachments/assets/1a3cb4c2-1208-43de-b036-421d3f407983" />

## Installation

```bash
# Clone the repository
git clone https://github.com/shrprabh/aos-sim-fcfs-sjf.git

# Navigate to the project directory
cd aos-sim-fcfs-sjf

# Install dependencies (if any)
# For example:
# npm install
# or
# pip install -r requirements.txt
```

## Usage

```bash
# Example command to run the simulation
# Replace with your actual command
python scheduler.py --algorithm fcfs --processes 5
```

### Sample Input Format

```
Number of processes: 4
Process 1:
  - Arrival time: 0
  - Burst time: 6
Process 2:
  - Arrival time: 1
  - Burst time: 3
Process 3:
  - Arrival time: 2
  - Burst time: 8
Process 4:
  - Arrival time: 3
  - Burst time: 2
```

### Sample Output

```
FCFS Scheduling Results:
Process | Arrival Time | Burst Time | Completion Time | Turnaround Time | Waiting Time
P1      | 0            | 6          | 6               | 6               | 0
P2      | 1            | 3          | 9               | 8               | 5
P3      | 2            | 8          | 17              | 15              | 7
P4      | 3            | 2          | 19              | 16              | 14

Average Waiting Time: 6.5
Average Turnaround Time: 11.25
```

## Project Structure

```
aos-sim-fcfs-sjf/
├── src/
│   ├── scheduler.py        # Main simulator implementation
│   ├── algorithms/
│   │   ├── fcfs.py         # FCFS implementation
│   │   └── sjf.py          # SJF implementation
│   └── utils/
│       ├── metrics.py      # Performance metrics calculation
│       └── visualizer.py   # Results visualization
├── tests/                  # Test cases
├── examples/               # Example inputs and outputs
├── docs/                   # Documentation
└── README.md               # This file
```

## Screenshots

*[Include screenshots of your application here if available]*

## Performance Comparison

| Algorithm | Avg. Waiting Time | Avg. Turnaround Time | Pros | Cons |
|-----------|-------------------|----------------------|------|------|
| FCFS      | Higher            | Higher               | Simple, easy to implement | Convoy effect |
| SJF       | Lower             | Lower                | Optimal average waiting time | Requires prior knowledge of CPU burst time, potential starvation |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Operating Systems Concepts by Silberschatz, Galvin, and Gagne for theoretical foundations
- [Tommy Dang] for guidance on the project
