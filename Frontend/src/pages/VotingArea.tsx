import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import CandidateCard from "../components/CandidateCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getElectionsState, updateStatesAndConsituency } from "../store/election";
import { calculateAge, findStatusOfElection } from "../utils/helper";
import { getCandidateState, updateCandidateProfile } from "../store/candidate";
import client from "../api/client";

const VotingArea = () => {
  interface selectedECandidatetypes {
    adhar: string;
    candidateName: string;
    constituency: string;
    createdAt: string;
    dob: string;
    electionName: string;
    imgUrl: string;
    party: string;
    state: string;
    updatedAt: string;
  }

  const [selectedElectionCadidates, setSelectedElectionCadidates] = useState<selectedECandidatetypes[]>();
  const [selectedElectionName, setSelectedElectionName] = useState<string>(""); // New state for selected election name
  const navigate = useNavigate();
  const { elections } = useSelector(getElectionsState);
  const { profiles } = useSelector(getCandidateState);
  const dispatch = useDispatch();

  const handleElectionClick = (electionName: string) => {
    let temp = profiles?.filter((item) => item.electionName === electionName);
    setSelectedElectionCadidates(temp);
    setSelectedElectionName(electionName); // Set the selected election name
  };

  const handleVoteClick = (electionName: string, _id: string) => {
    let temp = profiles?.filter((item) => item.electionName === electionName);
    navigate("/cast-vote", { state: { data: temp, electionId: _id } });
    setSelectedElectionCadidates(temp);
  };

  const handleCloseClick = () => {
    setSelectedElectionCadidates(null);
    setSelectedElectionName(""); // Clear the selected election name
  };

  const liveElections = elections?.filter(
    (election) => findStatusOfElection(election.startDate, election.endDate) === "Live"
  );

  const upcomingElections = elections?.filter(
    (election) => findStatusOfElection(election.startDate, election.endDate) === "Upcoming"
  );

  useEffect(() => {
    const func1 = async () => {
      const { data } = await client.get("elections/get-all-statesAndConsituency");
      dispatch(updateStatesAndConsituency(data.StatesAndConsituencies));
    };
    func1();
    const func = async () => {
      const { data } = await client.get("candidates/get-all-candidate");
      dispatch(updateCandidateProfile(data.candidates));
    };
    func();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">Voting Area</h1>
          </div>
        </div>
        {!selectedElectionCadidates && (
          <div className="grid grid-cols-1 gap-8 p-6">
            <h2 className="text-2xl font-bold text-left border-b-2 border-gray-300 pb-2">Live Elections</h2>
            {liveElections?.map((election) => (
              <div
                key={election._id}
                className="p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out bg-green-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{election.electionName}</h3>
                  <div>
                    <button
                      className="text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
                      onClick={() => handleElectionClick(election.electionName)}
                    >
                      View Candidates
                    </button>
                    <button
                      className="text-sm bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-600 transition duration-300 ease-in-out"
                      onClick={() => handleVoteClick(election.electionName, election._id)}
                    >
                      Vote
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <h2 className="text-2xl font-bold text-left border-b-2 border-gray-300 pb-2">Upcoming Elections</h2>
            {upcomingElections?.map((election) => (
              <div
                key={election._id}
                className="p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out bg-purple-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{election.electionName}</h3>
                  <button
                    className="text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => handleElectionClick(election._id)}
                  >
                    View Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedElectionCadidates && (
          <div className="mt-8 p-6 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Candidates for {selectedElectionName.toUpperCase()} ELECTION</h2> {/* Display the selected election name */}
              <button
                className="text-sm bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
            <div className="border-t border-gray-300 my-4 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedElectionCadidates?.map((candidate, index) => (
                <CandidateCard
                  key={index}
                  photoKey={candidate.imgUrl}
                  name={candidate.candidateName}
                  party={candidate.party}
                  age={calculateAge(candidate.dob)}
                  id={index + 1}
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
