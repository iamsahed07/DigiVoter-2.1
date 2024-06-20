// import React from 'react';
import CandidatePhotos from "../components/CandidatePhotos"; 
import PartyColors from "../components/PartyColors";
import { Aitmc, Inc, Bjp, Cpim, Aap, Sjp, Rjp } from "../components/PartySymbols"; 

const CandidateCard = ({ id, photoKey, name, party, age }) => {
  // Get the party color
  const color = PartyColors[party] || "#CCCCCC";

  // Function to handle the Google search
  const handleGoogleSearch = () => {
    const searchTerm = `${name} ${party}`;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`
    );
  };

  // Mapping photo key to the respective photo
  const CandidatePhoto = CandidatePhotos[photoKey]; // Changed variable name to singular form

  // Mapping party to the respective symbol component
  let PartySymbol;
  switch (party) {
    case "All India Trinamool Congress (AITMC)":
      PartySymbol = Aitmc;
      break;
    case "Indian National Congress (INC)":
      PartySymbol = Inc;
      break;
    case "Bharatiya Janata Party (BJP)":
      PartySymbol = Bjp;
      break;
    case "Communist Party of India (Marxist) (CPIM)":
      PartySymbol = Cpim;
      break;
    case "Aam Aadmi Party (AAP)":
      PartySymbol = Aap;
      break;
    case "Samajwadi Party (SJP)":
      PartySymbol = Sjp;
      break;
    case "Rashtriya Janata Party (RJP)":
      PartySymbol = Rjp;
      break;
    default:
      PartySymbol = () => null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Candidate photo */}
      <div className="flex justify-center">
        <CandidatePhoto /> {/* Changed component name to singular form */}
      </div>
      {/* Party color horizontal line */}
      <div style={{ backgroundColor: color, height: '4px' }}></div>
      {/* Candidate details */}
      <div className="p-4 flex items-center justify-between">
        <div>
          {/* Candidate name */}
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          {/* Candidate ID */}
          <p className="text-gray-700 mb-1">ID: {id}</p>
          {/* Candidate age */}
          <p className="text-gray-700">Age: {age}</p>
          {/* Candidate party */}
          <p className="text-gray-700">Party: {party}</p>
        </div>
        {/* Party symbol */}
        <div className="ml-4" style={{ width: "2.5cm", height: "2.5cm" }}>
          <PartySymbol />
        </div>
      </div>
      {/* Search button */}
      <div className="p-4 flex justify-center"> {/* Adjusted position to center */}
        <button
          onClick={handleGoogleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
