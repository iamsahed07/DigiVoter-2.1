// CandidatePhotos.tsx

import React from 'react';

// Import candidate photos
import Photo1 from '../assets/candidate_photos/rahul_gandhi.png';
import Photo2 from '../assets/candidate_photos/amit_shah.png';
import Photo3 from '../assets/candidate_photos/mamata_banerjee.png';
import Photo4 from '../assets/candidate_photos/arvind_kejriwal.png';
import Photo5 from '../assets/candidate_photos/akhilesh_yadav.png';
import Photo6 from '../assets/candidate_photos/biman_bose.png';
import Photo7 from '../assets/candidate_photos/shankersinh_vaghela.png';

// Define functional components for each candidate's photo based on their IDs
const CandidatePhotos = {
  Candidate1: () => <img src={Photo1} alt="Rahul Gandhi" />,
  Candidate2: () => <img src={Photo2} alt="Amit Shah" />,
  Candidate3: () => <img src={Photo3} alt="Mamata Banerjee" />,
  Candidate4: () => <img src={Photo4} alt="Arvind Kejriwal" />,
  Candidate5: () => <img src={Photo5} alt="Akhilesh Yadav" />,
  Candidate6: () => <img src={Photo6} alt="Biman Bose" />,
  Candidate7: () => <img src={Photo7} alt="Shankersinh Vaghela" />,
};

// Export all components
export default CandidatePhotos;
