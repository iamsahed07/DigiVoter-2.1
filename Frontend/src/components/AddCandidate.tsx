import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { useSelector } from "react-redux";
import { getElectionsState } from "../store/election";
import client from "../api/client";
const AddCandidate = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const { statesAndConsituency,elections } = useSelector(getElectionsState);
  const states = Object.keys(statesAndConsituency);
  const [candidate, setCandidate] = useState({
    name: "",
    party: "", // Hard coded party options
    position: "",
    age: "",
    aadhaar: "",
    photo: null,
    state: "", // Hard coded state options
    constituency: "", // Hard coded constituency options
    dob: "", // Added Date of Birth field
    electionFor:""
  });
  // console.log(candidate, elections);
  // console.log(statesAndConsituency[candidate.state]);
  const [imagePreview, setImagePreview] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setCandidate((prev) => ({ ...prev, photo: file }));

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!confirmation) {
      alert("Please confirm before submitting.");
      return;
    }
    // Handle form submission logic here
    // console.log("Candidate details:", candidate);
    const formData = new FormData();
    formData.append("candidateName",candidate.name);
    formData.append("electionName", candidate.electionFor);
    formData.append("party",candidate.party);
    formData.append("constituency", candidate.constituency);
    formData.append("adhar", candidate.aadhaar);
    formData.append("state",candidate.state);
    formData.append("dob",candidate.dob);
    formData.append("profile",candidate.photo);

    const { data } = await client.post("candidates/add-candidate", formData, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    });
    console.log(data);
    setSubmitted(true);
  };

  const handleAddMoreCandidates = () => {
    setCandidate({
      name: "",
      party: "",
      position: "",
      age: "",
      aadhaar: "",
      photo: null,
      state: "",
      constituency: "",
      dob: "",
      electionFor: "",
    });
    setImagePreview(null);
    setConfirmation(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg mb-6">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Add Candidate</h1>
          </div>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={candidate.name}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Party:</label>
                <select
                  name="party"
                  value={candidate.party}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">Select Party</option>
                  <option value="TMC">All India Trinamool Congress(TMC)</option>
                  <option value="INC">Indian National Congress (INC)</option>
                  <option value="BJP">Bharatiya Janata Party(BJP)</option>
                  <option value="CPIM">
                    Communist Party of India (Marxist)(CPIM)
                  </option>
                  <option value="AAP">Aam Aadmi Party(AAP)</option>
                  <option value="SP">Samajwadi Party(SP)</option>
                  <option value="RSP">
                    Revolutionary Socialist Party(RSP)
                  </option>
                  <option value="RJP">Rashtriya Janata Party (RJP)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">State:</label>
                <select
                  name="state"
                  value={candidate.state}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">
                  Constituency:
                </label>
                <select
                  name="constituency"
                  value={candidate.constituency}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                >
                  <option value="">Select Constituency</option>
                  {statesAndConsituency[candidate.state]?.map(
                    (item: string, index: number) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Election For:
              </label>
              <select
                name="electionFor"
                value={candidate.electionFor}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-1"
                required
              >
                <option value="">Select Election</option>
                {elections?.map((item, index: number) => (
                  <option value={item.electionName} key={index}>
                    {item.electionName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Aadhaar Number:
              </label>
              <input
                type="text"
                name="aadhaar"
                value={candidate.aadhaar}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Date of Birth:
              </label>
              <input
                type="date"
                name="dob"
                value={candidate.dob}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-1"
                required
              />
            </div>
            {/* Upload Photo */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="border rounded-lg p-2 mt-1"
              />
            </div>
            {imagePreview && (
              <div className="flex justify-center">
                <div
                  className="border border-gray-400 p-0.5"
                  style={{ width: "2.5in", height: "2.5in" }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              </div>
            )}
            <div className="flex items-center px-2">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setConfirmation(e.target.checked)}
              />
              <label className="text-gray-700">Confirm before submitting</label>
            </div>
            <div className="flex justify-between px-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate("/candidate-management")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center px-4">
            <p>Candidate Added successfully!</p>
            <div className="flex justify-between mt-4 mb-4">
              <button
                onClick={handleAddMoreCandidates}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Add Another Candidate
              </button>

              <button
                onClick={() => navigate("/candidate-management")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AddCandidate;
