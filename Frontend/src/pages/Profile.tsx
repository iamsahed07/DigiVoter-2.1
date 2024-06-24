import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

export default function Profile() {
  const { profile } = useSelector(getAuthState);
  console.log(profile);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">Your Profile</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-6 p-6">
          <img
            src={profile?.imgUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="ml-0 md:ml-8 mt-6 md:mt-0 text-center md:text-left">
            <p className="text-2xl font-semibold text-gray-800">
              NAME: {profile?.name.toUpperCase()}
            </p>
            <p className="text-lg text-gray-600">
              Voter ID/ Epic No: {profile?.voterId}
            </p>
            <p className="text-lg text-gray-600">
              Aadhaar No: {profile?.adhar}
            </p>
            <p className="text-lg text-gray-600">DOB: {profile?.dob}</p>
            <p className="text-lg text-gray-600">AGE: {profile?.age}</p>
            <p className="text-lg text-gray-600">
              Address: {profile?.address}
            </p>
          </div>
        </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-blue-600 text-white rounded px-8 py-2.5 m-5 hover:bg-blue-500"
          onClick={() => navigate("/voting-area")}
        >
          GO TO VOTING AREA
        </button>
      </div>
      </Container>
    </div>
  );
}
