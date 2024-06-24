// import React from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import TMCPNG from "../assets/party_logo/tmc.png";
import INCPNG from "../assets/party_logo/inc.png";
import BJPPNG from "../assets/party_logo/bjp.png";
import CPIMPNG from "../assets/party_logo/cpim.png";
import AapLogo from "../assets/party_logo/aap.png";
import SjpLogo from "../assets/party_logo/sjp.png";
import RjpLogo from "../assets/party_logo/rjd.png";
import { useEffect } from "react";
import client from "../api/client";
import { updateStatesAndConsituency } from "../store/election";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateState, updateCandidateProfile } from "../store/candidate";
import { calculateAge } from "../utils/helper";


const CandidateManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profiles } = useSelector(getCandidateState);

  // console.log(profiles);
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

    useEffect(() => {
      const func1 = async () => {
        const { data } = await client.get(
          "elections/get-all-statesAndConsituency"
        );
        
        dispatch(updateStatesAndConsituency(data.StatesAndConsituencies));
      };
      func1();
      const func = async () => {
        const { data } = await client.get("candidates/get-all-candidate");

        dispatch(updateCandidateProfile(data.candidates));
      };
      func();
    }, []);

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">
              Manage Candidates
            </h1>
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
              {profiles?.map((candidate) => (
                <li
                  key={candidate._id}
                  className="bg-white p-4 rounded-lg flex justify-between items-center"
                >
                  <div className="flex items-center">
                    {candidate.party === "TMC" && (
                      <img
                        src={TMCPNG}
                        alt="TMC Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "INC" && (
                      <img
                        src={INCPNG}
                        alt="INC Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "BJP" && (
                      <img
                        src={BJPPNG}
                        alt="BJP Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "CPIM" && (
                      <img
                        src={CPIMPNG}
                        alt="CPIM Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "AAP" && (
                      <img
                        src={AapLogo}
                        alt="AAP Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "SP" && (
                      <img
                        src={SjpLogo}
                        alt="SP Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    {candidate.party === "RJP" && (
                      <img
                        src={RjpLogo}
                        alt="RJP Symbol"
                        className="h-12 w-12 mr-4"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-semibold">
                        {candidate.candidateName}
                      </h4>
                      <div className="flex">
                        <p className="text-gray-600 mr-4">
                          Party: {candidate.party}
                        </p>
                        <p className="text-gray-600 mr-4">
                          Age: {calculateAge(candidate.dob)}
                        </p>
                        <p className="text-gray-600 mr-4">
                          Election: {candidate.electionName}
                        </p>
                        <p className="text-gray-600 mr-4">
                          State: {candidate.state}
                        </p>
                        <p className="text-gray-600 mr-4">
                          State: {candidate.constituency}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleEditCandidate(candidate._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => handleRemoveCandidate(candidate._id)}
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
