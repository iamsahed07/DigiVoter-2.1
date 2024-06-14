import React from 'react';
import CandidateDetails from './CandidateDetails';
const Selectors = ({ onElectionChange, onStateChange, onConstituencyChange }) => {
  const elections = [
    { id: 1, name: 'Lok Sabha Results' },
    { id: 2, name: 'Vidhan Sabha Results' },
  ];

  const states = [
    { id: 1, name: 'California' },
    { id: 2, name: 'Texas' },
  ];

  const constituencies = [
    { id: 1, name: 'District 1' },
    { id: 2, name: 'District 2' },
  ];

  return (
    <div className="selectors">
      <div className="selector">
        <label htmlFor="election">Election:</label>
        <select id="election" onChange={onElectionChange}>
          <option value="">Select Election</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selector">
        <label htmlFor="state">State:</label>
        <select id="state" onChange={onStateChange}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selector">
        <label htmlFor="constituency">Constituency:</label>
        <select id="constituency" onChange={onConstituencyChange}>
          <option value="">Select Constituency</option>
          {constituencies.map((constituency) => (
            <option key={constituency.id} value={constituency.id}>
              {constituency.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Selectors;
