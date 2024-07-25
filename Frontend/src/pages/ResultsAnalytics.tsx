import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Doughnut } from "react-chartjs-2";
import Select from "react-select";
import { PartyLogo } from "../components/PartySymbols";
import { useSelector } from "react-redux";
import { getElectionsState } from "../store/election";
import client from "../api/client";

import PartyColors from "../components/PartyColors"; // Import PartyColors
import { ChartOptions } from "chart.js";

const VotingResults = () => {
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const { elections } = useSelector(getElectionsState);
  const [electionResultsData, setElectionResultData] = useState([]);
  const [busy, setBusy] = useState(false);
  // console.log(electionResultsData);
  // console.log("selectedState", selectedState);
  // console.log("selectedElec", selectedElection);
  // console.log(electionResultsData);

  useEffect(() => {
    const func3 = async () => {
      setBusy(true);
      const token = localStorage.getItem("adminToken");
      const { data } = await client.post(
        "candidates/admin-get-based-on-electionName",
        {
          electionName: selectedElection.label,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const voterResult = data.cadidateBasedOnElectionName;
      voterResult.sort((a, b) => b.votes - a.votes);
      setElectionResultData(voterResult);
      setBusy(false);
    };
    if (selectedElection) func3();
  }, [selectedElection]);

  useEffect(() => {
    const func2 = async () => {
      setBusy(true);
      const token = localStorage.getItem("adminToken");
      const { data } = await client.post(
        "candidates/admin-get-based-on-state",
        {
          electionName: selectedElection.label,
          state: selectedState.label,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const voterResult = data.candidateBasedStates;
      voterResult.sort((a, b) => b.votes - a.votes);
      setElectionResultData(voterResult);
      setBusy(false);
    };
    if (selectedElection && selectedState) func2();
  }, [selectedState]);

  useEffect(() => {
    const func = async () => {
      setBusy(true);
      const token = localStorage.getItem("adminToken");
      const { data } = await client.post(
        "candidates/admin-get-based-on-constituency",
        {
          electionName: selectedElection.label,
          state: selectedState.label,
          constituency: selectedConstituency.label,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const voterResult = data.candidateBasedConstituency;
      voterResult.sort((a, b) => b.votes - a.votes);
      setElectionResultData(voterResult);
      setBusy(false);
    };
    if (selectedState && selectedConstituency && selectedElection) {
      func();
    }
  }, [selectedConstituency]);

  useEffect(() => {
    if (!selectedState) {
    }
  }, [selectedState]);

  const constituencies = {
    Maharashtra: [
      { value: "mumbaiNorth", label: "Mumbai North" },
      { value: "mumbaiSouth", label: "Mumbai South" },
      { value: "thane", label: "Thane" },
      { value: "pune", label: "Pune" },
    ],
    UttarPradesh: [
      { value: "lucknow", label: "Lucknow" },
      { value: "kanpur", label: "Kanpur" },
      { value: "varanasi", label: "Varanasi" },
      { value: "allahabad", label: "Allahabad" },
    ],
    Bihar: [
      { value: "patna", label: "Patna" },
      { value: "gaya", label: "Gaya" },
      { value: "muzaffarpur", label: "Muzaffarpur" },
      { value: "bhagalpur", label: "Bhagalpur" },
    ],
    WestBengal: [
      { value: "kolkataNorth", label: "Kolkata North" },
      { value: "kolkataSouth", label: "Kolkata South" },
      { value: "howrah", label: "Howrah" },
      { value: "asansol", label: "Asansol" },
    ],
    Karnataka: [
      { value: "bangaloreNorth", label: "Bangalore North" },
      { value: "bangaloreSouth", label: "Bangalore South" },
      { value: "mysore", label: "Mysore" },
      { value: "mangalore", label: "Mangalore" },
    ],
    Gujarat: [
      { value: "ahmedabadEast", label: "Ahmedabad East" },
      { value: "ahmedabadWest", label: "Ahmedabad West" },
      { value: "surat", label: "Surat" },
      { value: "vadodara", label: "Vadodara" },
    ],
  };

  const voteData = {
    labels: electionResultsData.map((result) => result.party),
    datasets: [
      {
        data: electionResultsData.map((result) => result.votes),
        backgroundColor: electionResultsData.map(
          (result) => PartyColors[result.party]
        ),
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
            family: "Helvetica Neue, Helvetica, Arial, sans-serif",
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Function to handle election selection
  const handleSelectElection = (selectedOption) => {
    setSelectedElection(selectedOption);
    setSelectedState(null); // Reset selected state on election change
    setSelectedConstituency(null); // Reset selected constituency on election change
  };

  // Function to handle state selection
  const handleSelectState = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedConstituency(null); // Reset selected constituency on state change
  };

  // Function to handle constituency selection
  const handleSelectConstituency = (selectedOption) => {
    setSelectedConstituency(selectedOption);
  };

  const getConstituenciesForSelectedState = () => {
    if (selectedState) {
      return constituencies[selectedState.label.replace(" ", "")] || [];
    }
    return [];
  };

  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">
              Results and Analytics
            </h1>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-6rem)]">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div className="w-1/3 pr-2">
                <Select
                  className="button-style"
                  options={elections.map((election) => ({
                    value: election._id,
                    label: election.electionName,
                    areas: election.areas,
                  }))}
                  onChange={handleSelectElection}
                  value={selectedElection}
                  placeholder="Select Election"
                />
              </div>

              {selectedElection ? (
                <div className="w-1/3 px-2">
                  <Select
                    className="button-style"
                    options={Object.keys(selectedElection.areas).map(
                      (state) => ({
                        value: state,
                        label: state,
                      })
                    )}
                    onChange={handleSelectState}
                    value={selectedState}
                    placeholder="Select State"
                  />
                </div>
              ) : (
                <div className="w-1/3 px-2">
                  <Select
                    className="button-style"
                    options={[].map((state) => ({
                      value: state,
                      label: state,
                    }))}
                    onChange={handleSelectState}
                    value={selectedState}
                    placeholder="Select State"
                  />
                </div>
              )}

              <div className="w-1/3 pl-2">
                <Select
                  className="button-style"
                  options={getConstituenciesForSelectedState()}
                  onChange={handleSelectConstituency}
                  value={selectedConstituency}
                  placeholder="Select Constituency"
                  isDisabled={!selectedState}
                />
              </div>
            </div>

            {busy ? (
              <div>Loading...</div>
            ) : (
              <div>
                {" "}
                {selectedElection ? (
                  <div>
                    {electionResultsData.length ? (
                      <div>
                        <div className="mb-6">
                          <h2 className="text-lg font-semibold mb-2 text-gray-800">
                            Vote Distribution
                          </h2>
                          <div
                            className="w-full flex justify-center items-center"
                            style={{ height: "300px" }}
                          >
                            <Doughnut data={voteData} options={options} />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold mb-2 text-gray-800">
                            Election Results
                          </h2>
                          <ul className="space-y-4">
                            {electionResultsData?.map((election, index) => (
                              <li
                                key={election._id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                              >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                  <div className="col-span-1 flex justify-center">
                                    <span className="text-md font-medium text-gray-800">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="col-span-1 flex justify-center">
                                    <div
                                      className="h-12 w-1"
                                      style={{
                                        backgroundColor:
                                          voteData.datasets[0].backgroundColor[
                                            index
                                          ],
                                      }}
                                    ></div>
                                  </div>
                                  <div
                                    className="col-span-2 flex justify-center"
                                    style={{ width: "1.5cm", height: "1.5cm" }}
                                  >
                                    {/* {election.} */}
                                    <PartyLogo party={election.party} />
                                  </div>
                                  <div className="col-span-4 flex items-center">
                                    <p className="text-sm font-medium text-gray-800">
                                      {election.party}
                                    </p>
                                  </div>
                                  <div className="mr-10 col-span-4 flex items-center justify-end">
                                    <p className="text-sm font-medium text-gray-800 transition-all duration-300 transform hover:scale-105">
                                      {election.votes} Votes
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-2xl font-semibold text-red-500">
                        Oops..No candidates!!!
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-2xl font-semibold text-red-500">
                    please select an election first!!!!!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VotingResults;
