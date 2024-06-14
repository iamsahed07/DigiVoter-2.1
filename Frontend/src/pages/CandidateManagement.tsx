import React from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import PartyAPng from "../assets/party_logo/tmc.png";
import PartyBPng from "../assets/party_logo/inc.png";
import PartyCPng from "../assets/party_logo/bjp.png";
import PartyDPng from "../assets/party_logo/cpim.png";

const CandidateManagement = () => {
  const navigate = useNavigate();

  const handleAddCandidate = () => {
    navigate("/add-candidate");
  };

  const handleViewCandidates = () => {
    navigate("/view-candidates");
  };

  const handleEditCandidate = (candidateId) => {
    navigate(`/edit-candidate/${candidateId}`);
  };

  const handleRemoveCandidate = (candidateId) => {
    // Implement remove logic
    console.log(`Removing candidate with id: ${candidateId}`);
  };

  // Mocked candidates data with age included and actual party symbol URLs
  const candidates = [
    { id: 1, name: "Candidate 1", party: "Party A", position: "President", age: 45 },
    { id: 2, name: "Candidate 2", party: "Party B", position: "Vice President", age: 38 },
    { id: 3, name: "Candidate 3", party: "Party C", position: "Secretary", age: 50 },
    { id: 4, name: "Candidate 4", party: "Party D", position: "Treasurer", age: 42 },
  ];

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Manage Candidates</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mb-4 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleAddCandidate}
            >
              Add Candidate
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mb-4 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleViewCandidates}
            >
              View Candidates
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Existing Candidates</h3>
            <ul className="grid grid-cols-1 gap-4">
              {candidates.map((candidate) => (
                <li key={candidate.id} className="bg-white p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    {candidate.party === "Party A" && <img src={PartyAPng} alt="Party A Symbol" className="h-12 w-12 mr-4" />}
                    {candidate.party === "Party B" && <img src={PartyBPng} alt="Party B Symbol" className="h-12 w-12 mr-4" />}
                    {candidate.party === "Party C" && <img src={PartyCPng} alt="Party C Symbol" className="h-12 w-12 mr-4" />}
                    {candidate.party === "Party D" && <img src={PartyDPng} alt="Party D Symbol" className="h-12 w-12 mr-4" />}
                    <div>
                      <h4 className="text-xl font-semibold">{candidate.name}</h4>
                      <div className="flex">
                        <p className="text-gray-600 mr-4">Party: {candidate.party}</p>
                        <p className="text-gray-600 mr-4">Age: {candidate.age}</p>
                        <p className="text-gray-600">Position: {candidate.position}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleEditCandidate(candidate.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleRemoveCandidate(candidate.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CandidateManagement;
