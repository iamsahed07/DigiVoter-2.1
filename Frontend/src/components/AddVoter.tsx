import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { getElectionsState } from "../store/election";
import { useSelector } from "react-redux";
import client from "../api/client";

const AddVoter = () => {
  const navigate = useNavigate();
  const { statesAndConsituency} = useSelector(getElectionsState);
  const states = Object.keys(statesAndConsituency);
  const [voter, setVoter] = useState({
    voterId: "",
    name: "",
    dob: "",
    mobile: "",
    email: "",
    aadhaar: "",
    gender: "",
    state: "",
    constituency: "",
    address:"",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);

  console.log(voter);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setVoter((prev) => ({ ...prev, photo: file }));

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
     formData.append("name", voter.name);
     formData.append("email", voter.email);
     formData.append("adhar", voter.aadhaar);
     formData.append("state", voter.state);
     formData.append("constituency", voter.constituency);
     formData.append("dob", voter.dob);
     formData.append("voterId", voter.voterId);
     formData.append("mobile", voter.mobile);
     formData.append("address", voter.address);
     formData.append("gender", voter.gender);
     formData.append("imgUrl", voter.photo);

     const { data } = await client.post(
       "auth/createUser",
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data;",
         },
       }
     );
     console.log(data);
     setSubmitted(true);
  };

  const handleAddMoreVoters = () => {
    
    setVoter({
      voterId: "",
      name: "",
      dob: "",
      mobile: "",
      email: "",
      aadhaar: "",
      address:"",
      gender: "",
      state: "",
      constituency: "",
      photo: null,
    });
    setImagePreview(null);
    setConfirmation(false);
    setSubmitted(false);
  };

  const handleBulkUpload = () => {
    setBulkUpload(!bulkUpload);
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg mb-6">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Add Voter</h1>
          </div>
        </div>
        {!submitted ? (
          <>
            {!bulkUpload ? (
              <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Voter ID:
                    </label>
                    <input
                      type="text"
                      name="voterId"
                      value={voter.voterId}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={voter.name}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={voter.dob}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Mobile:
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={voter.mobile}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={voter.email}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Aadhaar Number:
                    </label>
                    <input
                      type="text"
                      name="aadhaar"
                      value={voter.aadhaar}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={voter.gender}
                      onChange={handleChange}
                      className="border rounded-lg p-2 mt-1"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold">
                      State:
                    </label>
                    <select
                      name="state"
                      value={voter.state}
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
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    Constituency:
                  </label>
                  <select
                    name="constituency"
                    value={voter.constituency}
                    onChange={handleChange}
                    className="border rounded-lg p-2 mt-1"
                    required
                  >
                    <option value="">Select Constituency</option>
                    {statesAndConsituency[voter.state]?.map(
                      (item: string, index: number) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={voter.address}
                    onChange={handleChange}
                    className="border rounded-lg p-2 mt-1"
                    required
                  />
                </div>
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
                  <label className="text-gray-700">
                    Confirm before submitting
                  </label>
                </div>
                <div className="flex justify-between px-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Submit
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleBulkUpload}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Add Bulk Voters
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/voter-management")}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4 px-4 pb-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    Upload CSV File:
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    className="border rounded-lg p-2 mt-1"
                  />
                </div>
                <div className="flex justify-between px-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBulkUpload(false)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => console.log("Bulk upload")}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center px-4">
            <p>Voter Added successfully!</p>
            <div className="flex justify-between mt-4 mb-4">
              <button
                onClick={handleAddMoreVoters}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Add Another Voter
              </button>
              <button
                onClick={() => navigate("/voter-management")}
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

export default AddVoter;

