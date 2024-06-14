import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { HiUserCircle } from 'react-icons/hi'; // Importing HiUserCircle icon

// Register Chart.js components
ChartJS.register(LineElement, LinearScale, CategoryScale, Tooltip, Legend);

const HomeVoter = () => {
  const stats = {
    voterParticipation: [60, 62, 65, 68, 70], // Realistic yearly data for India in percentage
  };

  const recentActivities = [
    "You voted in the '2024 General Election'.",
    "Upcoming election 'Local School Board' on July 15th.",
    "View your profile to update your information.",
    "Election results announced for 'City Council' election.",
    "Information session scheduled for next week.",
  ];

  const lineChartRef = useRef(null);
  const [profileData, setProfileData] = useState(null); // State to store profile data

  useEffect(() => {
    // Simulated profile data retrieval (replace this with your actual logic)
    // Assume the profile data includes the user's name
    setTimeout(() => {
      const profileDataFromAPI = {
        name: "John Doe", // Placeholder for the user's name
      };
      setProfileData(profileDataFromAPI);
    }, 1000); // Simulating API call delay
  }, []);

  const lineData = {
    labels: ['2020', '2021', '2022', '2023', '2024'], // Updated to show data for the past five years
    datasets: [
      {
        label: 'Your Voter Participation (%)',
        data: [...stats.voterParticipation],
        fill: false,
        backgroundColor: '#4299E1', // Updated to shades of blue
        borderColor: '#4299E1', // Updated to shades of blue
        lineTension: 0.4, // Adjusting line tension for a more realistic appearance
      },
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false, // Adjusted to start from 0%
        min: 0, // Minimum value for the y-axis
        max: 100, // Maximum value for the y-axis
        ticks: {
          stepSize: 10, // Intervals of 10%
          callback: function(value) {
            return value + '%'; // Add '%' sign to y-axis ticks
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10 rounded-md">
      {/* Header */}
      
      <header className="bg-blue-600 text-white rounded-lg shadow-lg overflow-hidden p-4"> {/* Updated to use shades of blue */}
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Voter Platform</h1>
          <div className="flex items-center">
            {profileData && <span className="text-white mr-2">Welcome, {profileData.name}!</span>} {/* Displaying voter's name */}
            <Link to="/profile">
              <div className="flex items-center">
                <HiUserCircle className="w-8 h-8 text-gray-300" /> {/* Using HiUserCircle icon */}
                <span className="ml-2">Profile</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto py-6 flex-1">
        {/* Voter Participation Chart */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Voter Participation Over the Years</h2>
          <div className="w-full h-64 mx-auto">
            <Line ref={lineChartRef} data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Recent Activities */}
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
      </div>
    </div>
  );
};

export default HomeVoter;
