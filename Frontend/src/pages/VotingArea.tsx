import React, { useState } from "react";
import { Container } from "../components/Container";
import CandidateCard from "../components/CandidateCard";
import * as CandidatePhotos from "../components/CandidatePhotos";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const elections = [
  { id: "1", name: "Lok Sabha Election", status: "live" },
  { id: "2", name: "Vidhan Sabha", status: "upcoming" },
  { id: "3", name: "Other Election", status: "upcoming" },
];

const candidatesData = {
  "1": [
    {
      id: "1",
      name: "Rahul Gandhi",
      party: "Indian National Congress (INC)",
      photoKey: "Candidate1",
      age: 40,
    },
    {
      id: "2",
      name: "Amit Shah",
      party: "Bharatiya Janata Party (BJP)",
      photoKey: "Candidate2",
      age: 55,
    },
    {
      id: "3",
      name: "Mamata Banerjee",
      party: "All India Trinamool Congress (AITMC)",
      photoKey: "Candidate3",
      age: 66,
    },
    // Add other candidates for Lok Sabha election
    {
      id: "4",
      name: "Arvind Kejriwal",
      party: "Aam Aadmi Party (AAP)",
      photoKey: "Candidate4",
      age: 52,
    },
    {
      id: "5",
      name: "Akhilesh Yadav",
      party: "Samajwadi Party (SJP)",
      photoKey: "Candidate5",
      age: 80,
    },
    {
      id: "6",
      name: "Biman Bose",
      party: "Communist Party of India (Marxist) (CPIM)",
      photoKey: "Candidate6",
      age: 60,
    },
    {
      id: "7",
      name: "Shankersinh Vaghela",
      party: "Rashtriya Janata Party (RJP)",
      photoKey: "Candidate7",
      age: 75,
    },
  ],
  "2": [
    // Duplicate candidates for Vidhan Sabha election
    {
      id: "8",
      name: "Sonia Gandhi",
      party: "Indian National Congress (INC)",
      photoKey: "Candidate8",
      age: 65,
    },
    {
      id: "9",
      name: "Rajnath Singh",
      party: "Bharatiya Janata Party (BJP)",
      photoKey: "Candidate9",
      age: 70,
    },
    {
      id: "10",
      name: "Sukhbir Singh Badal",
      party: "Shiromani Akali Dal ()",
      photoKey: "Candidate10",
      age: 50,
    },
    {
      id: "11",
      name: "Mamata Banerjee",
      party: "All India Trinamool Congress (AITMC)",
      photoKey: "Candidate3",
      age: 66,
    },
    {
      id: "12",
      name: "Akhilesh Yadav",
      party: "Samajwadi Party (SJP)",
      photoKey: "Candidate12",
      age: 48,
    },
    {
      id: "13",
      name: "Uddhav Thackeray",
      party: "Shiv Sena",
      photoKey: "Candidate6",
      age: 60,
    },
    {
      id: "14",
      name: "Nitish Kumar",
      party: "Janata Dal (United)",
      photoKey: "Candidate14",
      age: 70,
    },
  ],
  "3": [
    // Duplicate candidates for Other Election
    {
      id: "15",
      name: "Mamata Banerjee",
      party: "All India Trinamool Congress (AITMC)",
      photoKey: "Candidate3",
      age: 66,
    },
    {
      id: "16",
      name: "Arvind Kejriwal",
      party: "Aam Aadmi Party (AAM)",
      photoKey: "Candidate4",
      age: 52,
    },
    {
      id: "17",
      name: "Sharad Pawar",
      party: "Nationalist Congress Party ()",
      photoKey: "Candidate5",
      age: 80,
    },
    {
      id: "18",
      name: "Naveen Patnaik",
      party: "Biju Janata Dal ()",
      photoKey: "Candidate7",
      age: 75,
    },
    {
      id: "19",
      name: "Omar Abdullah",
      party: "National Conference ()",
      photoKey: "Candidate19",
      age: 50,
    },
    {
      id: "20",
      name: "Biplab Kumar Deb",
      party: "Bharatiya Janata Party (BJP)",
      photoKey: "Candidate20",
      age: 50,
    },
    {
      id: "21",
      name: "Pawan Chamling",
      party: "Sikkim Democratic Front ()",
      photoKey: "Candidate21",
      age: 65,
    },
  ],
};

const VotingArea = () => {
  const [selectedElection, setSelectedElection] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleElectionClick = (electionId) => {
    setSelectedElection(electionId);
  };

  const handleVoteClick = () => {
    navigate("/cast-vote"); // Navigate to CastVote page
  };

  const handleCloseClick = () => {
    setSelectedElection(null);
  };

  const liveElections = elections.filter(
    (election) => election.status === "live"
  );
  const upcomingElections = elections.filter(
    (election) => election.status === "upcoming"
  );

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">Voting Area</h1>
          </div>
        </div>
        {!selectedElection && (
          <div className="grid grid-cols-1 gap-8 p-6">
            <h2 className="text-2xl font-bold text-left border-b-2 border-gray-300 pb-2">
              Live Elections
            </h2>
            {liveElections.map((election) => (
              <div
                key={election.id}
                className="p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out bg-green-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{election.name}</h3>
                  <div>
                    <button
                      className="text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
                      onClick={() => handleElectionClick(election.id)}
                    >
                      View Candidates
                    </button>
                    <button
                      className="text-sm bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600 transition duration-300 ease-in-out"
                      onClick={handleVoteClick}
                    >
                      Vote
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <h2 className="text-2xl font-bold text-left border-b-2 border-gray-300 pb-2">
              Upcoming Elections
            </h2>
            {upcomingElections.map((election) => (
              <div
                key={election.id}
                className="p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out bg-purple-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{election.name}</h3>
                  <button
                    className="text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => handleElectionClick(election.id)}
                  >
                    View Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedElection && (
          <div className="mt-8 p-6 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Candidates for{" "}
                {elections.find((e) => e.id === selectedElection).name}
              </h2>
              <button
                className="text-sm bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidatesData[selectedElection].map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  photoKey={candidate.photoKey}
                  name={candidate.name}
                  party={candidate.party}
                  age={candidate.age}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default VotingArea;