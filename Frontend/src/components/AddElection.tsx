import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";

const AddElection = () => {
  const navigate = useNavigate();
  const [election, setElection] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "upcoming", // Default status
  });
  const [confirmation, setConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (election.startDate && election.endDate) {
      if (currentDate < election.startDate) {
        setElection((prev) => ({ ...prev, status: "upcoming" }));
      } else if (currentDate >= election.startDate && currentDate <= election.endDate) {
        setElection((prev) => ({ ...prev, status: "live" }));
      } else if (currentDate > election.endDate) {
        setElection((prev) => ({ ...prev, status: "ended" }));
      }
    }
  }, [election.startDate, election.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmation) {
      alert("Please confirm before submitting.");
      return;
    }
    // Handle form submission logic here
    console.log("Election details:", election);
    setSubmitted(true);
  };

  const handleAddMoreElections = () => {
    setElection({
      name: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
    });
    setConfirmation(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg mb-6">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Add Election</h1>
          </div>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Election Name:</label>
              <input
                type="text"
                name="name"
                value={election.name}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={election.startDate}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={election.endDate}
                  onChange={handleChange}
                  className="border rounded-lg p-2 mt-1"
                  required
                />
              </div>
            </div>
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
              <button
                type="button"
                onClick={() => navigate("/election-management")}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center px-4">
            <p>Election Added successfully!</p>
            <div className="flex justify-between mt-4 mb-4">
              <button
                onClick={handleAddMoreElections}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Add Another Election
              </button>
              <button
                onClick={() => navigate("/election-management")}
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

export default AddElection;
