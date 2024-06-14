// import React from "react";

const CandidatesData = () => {
  const elections = [
    { id: "1", name: "Lok Sabha Election", status: "live" },
    { id: "2", name: "Vidhan Sabha", status: "upcoming" },
    { id: "3", name: "Other Election", status: "upcoming" }
  ];

  const candidatesData = {
    "1": [
      { id: "1", name: "Rahul Kumar", party: "Indian National Congress", photoKey: "Candidate1", age: 40 },
      { id: "2", name: "Amit Shah", party: "Bharatiya Janata Party", photoKey: "Candidate2", age: 55 },
      { id: "3", name: "Mamata Banerjee", party: "All India Trinamool Congress", photoKey: "Candidate3", age: 66 },
      // Add other candidates for Lok Sabha election
      { id: "4", name: "Arvind Kejriwal", party: "Aam Aadmi Party", photoKey: "Candidate4", age: 52 },
      { id: "5", name: "Sharad Pawar", party: "Nationalist Congress Party", photoKey: "Candidate5", age: 80 },
      { id: "6", name: "Uddhav Thackeray", party: "Shiv Sena", photoKey: "Candidate6", age: 60 },
      { id: "7", name: "Naveen Patnaik", party: "Biju Janata Dal", photoKey: "Candidate7", age: 75 }
    ],
    "2": [
      // Duplicate candidates for Vidhan Sabha election
      { id: "8", name: "Sonia Gandhi", party: "Indian National Congress", photoKey: "Candidate8", age: 65 },
      { id: "9", name: "Rajnath Singh", party: "Bharatiya Janata Party", photoKey: "Candidate9", age: 70 },
      { id: "10", name: "Sukhbir Singh Badal", party: "Shiromani Akali Dal", photoKey: "Candidate10", age: 50 },
      { id: "11", name: "Mamata Banerjee", party: "All India Trinamool Congress", photoKey: "Candidate3", age: 66 },
      { id: "12", name: "Akhilesh Yadav", party: "Samajwadi Party", photoKey: "Candidate12", age: 48 },
      { id: "13", name: "Uddhav Thackeray", party: "Shiv Sena", photoKey: "Candidate6", age: 60 },
      { id: "14", name: "Nitish Kumar", party: "Janata Dal (United)", photoKey: "Candidate14", age: 70 }
    ],
    "3": [
      // Duplicate candidates for Other Election
      { id: "15", name: "Mamata Banerjee", party: "All India Trinamool Congress", photoKey: "Candidate3", age: 66 },
      { id: "16", name: "Arvind Kejriwal", party: "Aam Aadmi Party", photoKey: "Candidate4", age: 52 },
      { id: "17", name: "Sharad Pawar", party: "Nationalist Congress Party", photoKey: "Candidate5", age: 80 },
      { id: "18", name: "Naveen Patnaik", party: "Biju Janata Dal", photoKey: "Candidate7", age: 75 },
      { id: "19", name: "Omar Abdullah", party: "National Conference", photoKey: "Candidate19", age: 50 },
      { id: "20", name: "Biplab Kumar Deb", party: "Bharatiya Janata Party", photoKey: "Candidate20", age: 50 },
      { id: "21", name: "Pawan Chamling", party: "Sikkim Democratic Front", photoKey: "Candidate21", age: 65 }
    ]
  };

  return (
    <div>
      <h2>Candidates Data:</h2>
      {Object.keys(candidatesData).map(electionId => (
        <div key={electionId}>
          <h3>{elections.find(e => e.id === electionId)?.name}</h3>
          <ul>
            {candidatesData[electionId].map(candidate => (
              <li key={candidate.id}>
                {candidate.name} - {candidate.party} - Age: {candidate.age}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CandidatesData;
