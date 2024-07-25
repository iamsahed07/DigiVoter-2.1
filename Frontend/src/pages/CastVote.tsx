import { useState, useEffect, SetStateAction, JSXElementConstructor, Key, ReactElement, ReactNode } from "react";
import { Container } from "../components/Container";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";
import { ImArrowLeft } from "react-icons/im";
import client from "../api/client";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { PartyLogo } from "../components/PartySymbols";
import { partyDetails } from "../utils/color";
// import election from "../store/election";

export default function CastVote() {
  const { profile } = useSelector(getAuthState);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const location = useLocation();
  const candidates = location.state || {};
  // console.log(candidates);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem("token");
      const { data } = await client.post(
        "vote/isVoted",
        {
          electionId: candidates.electionId,
          
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsVoted(data.isVoted);
    };
    func();
    let countdown: number;
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

  const handleVoteClick = async (candidateId: any) => {
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
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (votedCandidateId: any) => {
    setIsVerifying(true);
    const token = localStorage.getItem("token");
    console.log({
      candidateId: votedCandidateId,
      electionId: candidates.electionId,
      token: otp,
    });
    try {
      const {data} = await client.post(
        "vote/give-vote",
        {
          candidateId: votedCandidateId,
          electionId: candidates.electionId,
          token: otp,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data);
      if (data.success) {
        toast.success("Vote counted successfully!");
        setShowOtpPopup(false);
        setIsVerifying(false);
        setOtp("");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
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
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full md:w-3/4 md:float-right md:mr-10 h-screen mt-10">
      {isVoted ? (
        <div className="flex items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-red-500">
        Your vote recorded successfully !! Thank you!!!
        </h2>
      </div>
      ) : (
        <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
          <div className="bg-indigo-500 text-white rounded-t-lg shadow-lg">
            <div className="flex justify-center items-center h-12">
              <h1 className="text-2xl font-bold uppercase">Cast Vote</h1>
            </div>
          </div>
          <div className="flex flex-col items-center p-6">
            {candidates.data.map((candidate: { _id: Key; party: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>; imgUrl: string; candidateName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>; }, index: number) => (
              <div
                key={candidate._id}
                className="flex items-center w-full p-4 border-b last:border-none"
              >
                <span className="mr-6 text-lg font-semibold">{index + 1}</span>
                <div
                  className="w-2 h-12 mr-6"
                  style={{
                    backgroundColor: partyDetails[`${candidate.party}`]?.color,
                  }}
                ></div>
                <img
                  src={candidate.imgUrl}
                  alt={`${candidate.candidateName}`}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">
                    {candidate.candidateName}
                  </h2>
                  <p className="text-sm text-gray-600">{candidate.party}</p>
                </div>
                {candidate.party && (
                  <div className="w-12 h-12 flex items-center justify-center mr-4" style={{ width: "1.5cm", height: "1.5cm" }}>
                    <PartyLogo party={candidate.party}></PartyLogo>
                  </div>
                )}
                <ImArrowLeft
                  className={`text-lg ml-auto mr-auto ${
                    votedCandidateId === candidate._id
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                />
                <button
                  className={`ml-4 text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out ${
                    votedCandidateId ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleVoteClick(candidate._id)}
                  disabled={votedCandidateId !== null}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        </Container>
      )}
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
            Please check your registered email for OTP verification.
            </h2>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowOtpPopup(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOtpSubmit(votedCandidateId)}
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
                } px-6 py-2 rounded-full shadow-md hover:scale-105 transition duration-300 ease-in-out`}
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
