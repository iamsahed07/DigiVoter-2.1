import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { FaSearch, FaEdit, FaMapMarkerAlt, FaDownload } from "react-icons/fa";
import { Container } from "../components/Container"; // Import the Container component

const HomeVoter = () => {
  const recentActivities = [
    "You voted in the '2024 General Election'.",
    "Upcoming election 'Local School Board' on July 15th.",
    "View your profile to update your information.",
    "Election results announced for 'City Council' election.",
    "Information session scheduled for next week.",
  ];

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const profileDataFromAPI = {
        name: "John Doe",
      };
      setProfileData(profileDataFromAPI);
    }, 1000);
  }, []);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">Voter's Dashboard</h1>
          </div>
        </div>

        <div className="container mx-auto py-6 flex-1 px-10">
          <div className="flex items-center justify-between p-4 text-white rounded-t-md mb-6">
            <div className="flex items-center">
              <HiUserCircle className="w-12 h-12 mr-4 text-indigo-500" />
              {profileData && (
                <span className="text-xl font-semibold text-indigo-500 ">
                  Hello, {profileData.name}!
                </span>
              )}
            </div>
            <Link to="/profile">
              <div className="flex items-center bg-white text-indigo-500 rounded-full px-4 py-2 shadow-lg cursor-pointer">
                <HiUserCircle className="w-6 h-6 mr-2" />
                <span className="text-md font-semibold">Profile</span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Search in Electoral Roll */}
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer transition duration-200 transform hover:scale-105 flex flex-col items-center"
              onClick={() =>
                openLinkInNewTab("https://electoralsearch.eci.gov.in/")
              }
            >
              <FaSearch className="w-10 h-10 mb-2" />
              <h2 className="text-md font-semibold text-center">
                Search in Electoral Roll
              </h2>
            </div>

            {/* Apply for Correction of Voter Details */}
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer transition duration-200 transform hover:scale-105 flex flex-col items-center"
              onClick={() => openLinkInNewTab("https://voters.eci.gov.in/")}
            >
              <FaEdit className="w-10 h-10 mb-2" />
              <h2 className="text-md font-semibold text-center">
                Apply for Correction of Voter Details
              </h2>
            </div>

            {/* Know Your Polling Station & Officer */}
            <div
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer transition duration-200 transform hover:scale-105 flex flex-col items-center"
              onClick={() =>
                openLinkInNewTab(
                  "https://electoralsearch.eci.gov.in/pollingstation"
                )
              }
            >
              <FaMapMarkerAlt className="w-10 h-10 mb-2" />
              <h2 className="text-md font-semibold text-center">
                Know Your Polling Station & Officer
              </h2>
            </div>

            {/* Download E-EPIC */}
            <div
              className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer transition duration-200 transform hover:scale-105 flex flex-col items-center"
              onClick={() =>
                openLinkInNewTab("https://voters.eci.gov.in/login")
              }
            >
              <FaDownload className="w-10 h-10 mb-2" />
              <h2 className="text-md font-semibold text-center">
                Download E-EPIC
              </h2>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6">
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
      </Container>
    </div>
  );
};

export default HomeVoter;
