import React from 'react';

interface Candidate {
  name: string;
  party: string;
  age: number;
  dob: string;
  aadhaar: string;
  state: string;
  constituency: string;
  vote_count: number;
}

const electionResults = [
  { id: 1, name: 'Lok Sabha Elections' },
  { id: 2, name: 'Vidhan Sabha Elections' },
];

const states = [
  { id: 1, name: 'Maharashtra' },
  { id: 2, name: 'Uttar Pradesh' },
  { id: 3, name: 'Bihar' },
  { id: 4, name: 'West Bengal' },
  { id: 5, name: 'Karnataka' },
  { id: 6, name: 'Gujarat' },
];

const constituencies = {
  'Lok Sabha Elections': {
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
  },
  'Vidhan Sabha Elections': {
    Maharashtra: [
      { value: "nashik", label: "Nashik" },
      { value: "nagpur", label: "Nagpur" },
      { value: "solapur", label: "Solapur" },
      { value: "amravati", label: "Amravati" },
    ],
    UttarPradesh: [
      { value: "agra", label: "Agra" },
      { value: "aligarh", label: "Aligarh" },
      { value: "bareilly", label: "Bareilly" },
      { value: "meerut", label: "Meerut" },
    ],
    Bihar: [
      { value: "darbhanga", label: "Darbhanga" },
      { value: "siwan", label: "Siwan" },
      { value: "purnia", label: "Purnia" },
      { value: "samastipur", label: "Samastipur" },
    ],
    WestBengal: [
      { value: "darjeeling", label: "Darjeeling" },
      { value: "jalpaiguri", label: "Jalpaiguri" },
      { value: "siliguri", label: "Siliguri" },
      { value: "malda", label: "Malda" },
    ],
    Karnataka: [
      { value: "hubbali", label: "Hubbali" },
      { value: "belgaum", label: "Belgaum" },
      { value: "gulbarga", label: "Gulbarga" },
      { value: "bellary", label: "Bellary" },
    ],
    Gujarat: [
      { value: "rajkot", label: "Rajkot" },
      { value: "bhavnagar", label: "Bhavnagar" },
      { value: "jamnagar", label: "Jamnagar" },
      { value: "gandhinagar", label: "Gandhinagar" },
    ],
  },
};


// const CandidateDetails: React.FC = () => {
//   return (
//     <div>
//       <h2>Candidate Details</h2>
//       <ul>
//         {candidates.map((candidate, index) => (
//           <li key={index}>
//             <strong>Name:</strong> {candidate.name}<br />
//             <strong>Party:</strong> {candidate.party}<br />
//             <strong>Age:</strong> {candidate.age}<br />
//             <strong>DOB:</strong> {candidate.dob}<br />
//             <strong>Aadhaar:</strong> {candidate.aadhaar}<br />
//             <strong>State:</strong> {candidate.state}<br />
//             <strong>Constituency:</strong> {candidate.constituency}<br />
//             <strong>Vote Count:</strong> {candidate.vote_count}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CandidateDetails;


