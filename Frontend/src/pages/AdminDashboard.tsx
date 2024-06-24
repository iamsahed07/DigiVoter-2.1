import { useRef, useEffect } from "react";
import { Container } from "../components/Container";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const stats = {
    totalVoters: 25000,
    totalVotes: 180000,
    activeElections: 20,
    voterParticipation: [60, 62, 65, 68, 70],
    availableVoters: Array(5).fill(100),
  };

  const recentActivities = [
    "User John Doe registered.",
    "Election '2024 General Election' created.",
    "Vote cast by Jane Smith.",
    "User Mark Brown updated profile.",
    "Election 'Local School Board' results published.",
  ];

  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current) {
      const pieInstance = pieChartRef.current.chartInstance;
      if (pieInstance) {
        pieInstance.destroy();
      }
    }
    if (lineChartRef.current) {
      const lineInstance = lineChartRef.current.chartInstance;
      if (lineInstance) {
        lineInstance.destroy();
      }
    }
  }, []);

  const pieData = {
    labels: ["Voters Participated", "Remaining Voters"],
    datasets: [
      {
        data: [
          stats.voterParticipation[stats.voterParticipation.length - 1],
          stats.availableVoters[stats.availableVoters.length - 1] -
            stats.voterParticipation[stats.voterParticipation.length - 1],
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce(
              (previousValue, currentValue) => previousValue + currentValue
            );
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = Math.floor((currentValue / total) * 100 + 0.5);
            return `${percentage}%`;
          },
        },
      },
    },
  };

  const lineData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "National Voter Turnout (%)",
        data: [...stats.voterParticipation, null],
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        lineTension: 0.4,
      },
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">
              Admin Dashboard
            </h1>
          </div>
        </div>
        <div className="px-5">
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold">Total Voters</h2>
              <p className="text-3xl">{stats.totalVoters}</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold">Total Votes</h2>
              <p className="text-3xl">{stats.totalVotes}</p>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold">Active Elections</h2>
              <p className="text-3xl">{stats.activeElections}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
            </div>
            <div className="p-4">
              <ul>
                {recentActivities.map((activity, index) => (
                  <li key={index} className="border-b py-2">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
              <h3 className="text-lg font-semibold mb-4">Vote Distribution</h3>
              <div className="w-64 h-64 mx-auto">
                <Pie ref={pieChartRef} data={pieData} options={pieOptions} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
              <h3 className="text-lg font-semibold mb-4">
                National Voter Turnout
              </h3>
              <div className="w-full h-64 mx-auto">
                <Line
                  ref={lineChartRef}
                  data={lineData}
                  options={lineOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
