import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";

const ElectionManagement = () => {
  const navigate = useNavigate();

  const handleAddElection = () => {
    navigate("/add-election");
  };

  const handleViewElections = () => {
    navigate("/view-elections");
  };

  const handleEditElection = (electionId: number) => {
    navigate(`/edit-election/${electionId}`);
  };

  const handleRemoveElection = (electionId: number) => {
    // Implement remove logic
    console.log(`Removing election with id: ${electionId}`);
  };

  // Mocked elections data
  const elections = [
    { id: 1, name: "Election 1", startDate: "2024-07-01", endDate: "2024-07-10", status: "live" },
    { id: 2, name: "Election 2", startDate: "2024-08-15", endDate: "2024-08-25", status: "upcoming" },
    { id: 3, name: "Election 3", startDate: "2024-06-01", endDate: "2024-06-10", status: "ended" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-9">
            <h1 className="py-1 text-lg font-bold uppercase">Manage Elections</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mb-4 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleAddElection}
            >
              Add Election
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mb-4 mr-4 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleViewElections}
            >
              View Elections
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Existing Elections</h3>
            <ul className="grid grid-cols-1 gap-4">
              {elections.map((election) => (
                <li key={election.id} className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-semibold">{election.name}</h4>
                      <div className="flex">
                        <p className="text-gray-600 mr-4">Start Date: {election.startDate}</p>
                        <p className="text-gray-600">End Date: {election.endDate}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Status: {election.status === "live" ? "Live" : election.status === "upcoming" ? "Upcoming" : "Ended"}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleEditElection(election.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleRemoveElection(election.id)}
                      >
                        Remove
                      </button>
                    </div>
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

export default ElectionManagement;
