import { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";
import {
  Aitmc,
  Inc,
  Bjp,
  Cpim,
  Aap,
  Sjp,
  Rjp,
} from "../components/PartySymbols";
import * as CandidatePhotos from "../components/CandidatePhotos";
import { ImArrowLeft } from "react-icons/im";
import client from "../api/client";

const candidatesData = [
  {
    id: "1",
    name: "Rahul Gandhi",
    party: "Indian National Congress",
    photo: CandidatePhotos.Candidate1,
    partySymbol: Inc,
    color: "#0F56B3",
  },
  {
    id: "2",
    name: "Amit Shah",
    party: "Bharatiya Janata Party",
    photo: CandidatePhotos.Candidate2,
    partySymbol: Bjp,
    color: "#FF9933",
  },
  {
    id: "3",
    name: "Mamata Banerjee",
    party: "All India Trinamool Congress",
    photo: CandidatePhotos.Candidate3,
    partySymbol: Aitmc,
    color: "#008000",
  },
  {
    id: "4",
    name: "Arvind Kejriwal",
    party: "Aam Aadmi Party",
    photo: CandidatePhotos.Candidate4,
    partySymbol: Aap,
    color: "#00FFFF",
  },
  {
    id: "5",
    name: "Akhilesh Yadav",
    party: "Samajwadi Party",
    photo: CandidatePhotos.Candidate5,
    partySymbol: Sjp,
    color: "#0000FF",
  },
  {
    id: "6",
    name: "Biman Bose",
    party: "Communist Party of India (Marxist) (CPIM)",
    photo: CandidatePhotos.Candidate6,
    partySymbol: Cpim,
    color: "#800080",
  },
  {
    id: "7",
    name: "Shankersinh Vaghela",
    party: "Rashtriya Janata Party (RJP)",
    photo: CandidatePhotos.Candidate7,
    partySymbol: Rjp,
    color: "#008000",
  },
];

export default function CastVote() {
  const { profile } = useSelector(getAuthState);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let countdown;
    if (showOtpPopup && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [showOtpPopup, timer]);

  const handleVoteClick = async (candidateId) => {
    setVotedCandidateId(candidateId);
    setTimeout(() => {
      setShowOtpPopup(true);
    }, 1000);
    const token = localStorage.getItem("token");
    try {
      const response = await client.post(
        "/vote/sendOtpForVote",
        {
          adhar: profile?.adhar,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await client.post(
        "/auth/verifyToken",
        {
          adhar: profile.adhar,
          token: otp,
        },
        {
          params: {
            useAdhar: "yes",
            useMobile: "no",
          },
        }
      );

      if (response.data.success) {
        alert("Vote counted successfully!");
        // Perform additional actions like updating the backend with the vote
      } else {
        alert("Invalid OTP. Please try again.");
      }
      setShowOtpPopup(false);
      setIsVerifying(false);
      setOtp("");
    } catch (error) {
      alert("Failed to verify OTP. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setIsResendDisabled(true);
    const token = localStorage.getItem("token");
    try {
      const response = await client.post(
        "/vote/sendOtpForVote",
        {
          adhar: profile?.adhar,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full md:w-3/4 md:float-right md:mr-10 h-screen mt-10">
      <Container className="bg-white col-start-2 col-end-12 mt-1 mb-6 shadow-2xl">
        <div className="flex justify-center items-center bg-indigo-500 text-center text-white rounded-t-md h-12 ">
          <h1 className="py-2 text-2xl font-bold uppercase">Cast Vote</h1>
        </div>
        <div className="flex flex-col items-center p-4">
          {candidatesData.map((candidate, index) => (
            <div
              key={candidate.id}
              className="flex items-center w-full p-4 border-b"
            >
              <span className="mr-4 text-lg">{index + 1}</span>
              <div
                className="w-1.5 h-12 mr-4"
                style={{ backgroundColor: candidate.color }}
              ></div>
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{candidate.name}</h2>
                <p className="text-sm">{candidate.party}</p>
              </div>
              {candidate.partySymbol && (
                <div className="w-12 h-12 flex items-center justify-center mr-4">
                  <candidate.partySymbol />
                </div>
              )}
              <ImArrowLeft
                className={`text-lg ml-auto mr-auto ${
                  votedCandidateId === candidate.id
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              />
              <button
                className={`ml-4 text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out ${
                  votedCandidateId ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleVoteClick(candidate.id)}
                disabled={votedCandidateId !== null}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      </Container>
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Check your Aadhaar registered email to verify OTP
            </h2>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowOtpPopup(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpSubmit}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${
                  isVerifying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Submit"}
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleResendOtp}
                className={`${
                  isResendDisabled
                    ? "bg-red-200 text-gray-700 cursor-not-allowed"
                    : "bg-green-100"
                } px-6 py-2 rounded-full shadow-md hover:scale-105`}
                disabled={isResendDisabled}
              >
                Resend OTP in {isResendDisabled && <span>({timer})</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
