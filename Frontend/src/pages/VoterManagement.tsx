import React from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";

const VoterManagement = () => {
  const navigate = useNavigate();

  const handleAddVoter = () => {
    navigate("/add-voter");
  };

  const handleViewVoters = () => {
    navigate("/view-voters");
  };

  const handleEditVoter = (voterId) => {
    navigate(`/edit-voter/${voterId}`);
  };

  const handleRemoveVoter = (voterId) => {
    // Implement remove logic
    console.log(`Removing voter with id: ${voterId}`);
  };

  // Mocked voters data
  const voters = [
    { id: 1, name: "Voter 1", age: 30, gender: "Male", address: "Address 1", assembly: "Assembly 1" },
    { id: 2, name: "Voter 2", age: 35, gender: "Female", address: "Address 2", assembly: "Assembly 2" },
    { id: 3, name: "Voter 3", age: 25, gender: "Male", address: "Address 3", assembly: "Assembly 3" },
    { id: 4, name: "Voter 4", age: 40, gender: "Female", address: "Address 4", assembly: "Assembly 4" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-white col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Manage Voters</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleAddVoter}
              >
                Add Voter
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleViewVoters}
              >
                View All Voters
              </button>
            </div>
            <select
              className="p-2 bg-white border border-gray-300 rounded-lg"
              onChange={handleViewVoters}
            >
              <option value="">Select Assembly</option>
              <option value="Assembly 1">Assembly 1</option>
              <option value="Assembly 2">Assembly 2</option>
              <option value="Assembly 3">Assembly 3</option>
              <option value="Assembly 4">Assembly 4</option>
            </select>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Total Voters: {voters.length}</h3>
          <ul className="grid grid-cols-1 gap-4">
            {voters.map((voter, index) => (
              <li key={voter.id} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                <div className="w-1/5">
                  <p className="text-gray-600">Sl.No.: {index + 1}</p>
                  <p className="text-gray-600">Voter Id: {voter.id}</p>
                </div>
                <div className="w-1/5">
                  <p className="text-gray-600">Name: {voter.name}</p>
                  <p className="text-gray-600">Age: {voter.age}</p>
                </div>
                <div className="w-1/5">
                  <p className="text-gray-600">Gender: {voter.gender}</p>
                  <p className="text-gray-600">Address: {voter.address}</p>
                </div>
                <div className="w-1/5">
                  <p className="text-gray-600">Assembly: {voter.assembly}</p>
                </div>
                <div className="w-1/5">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleEditVoter(voter.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleRemoveVoter(voter.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default VoterManagement;
