// import React from 'react';

// Import party logos
import IncLogo from "../assets/party_logo/inc.png";
import BjpLogo from "../assets/party_logo/bjp.png";
import AitmcLogo from "../assets/party_logo/tmc.png";
import CpimLogo from "../assets/party_logo/cpim.png";
import AapLogo from "../assets/party_logo/aap.png";
import SjpLogo from "../assets/party_logo/sjp.png";
import RjpLogo from "../assets/party_logo/rjd.png";

// Define functional components for each party symbol
const Aitmc = () => <img src={AitmcLogo} alt="AITMC Logo" />;
const Inc = () => <img src={IncLogo} alt="INC Logo" />;
const Bjp = () => <img src={BjpLogo} alt="BJP Logo" />;
const Cpim = () => <img src={CpimLogo} alt="CPIM Logo" />;
const Aap = () => <img src={AapLogo} alt="AAP Logo" />;
const Sjp = () => <img src={SjpLogo} alt="SJP Logo" />;
const Rjp = () => <img src={RjpLogo} alt="RJP Logo" />;

export { Aitmc, Inc, Bjp, Cpim, Aap, Sjp, Rjp };

export const PartyLogo = ({ party }) => {

  if (party === "Indian National Congress (INC)") return <Inc/>;
  else if (party === "Bharatiya Janata Party (BJP)") return <Bjp/>;
  else if (party === "All India Trinamool Congress (AITMC)") return <Aitmc/>;
  else if (party === "Communist Party of India (Marxist) (CPIM)") return <Cpim/>;
  else if (party === "Aam Aadmi Party (AAP)") return <Aap/>;
  else if (party === "Samajwadi Janta Party (SJP)") return <Sjp/>;
  else if (party === "Rastaya Janta Party (RJP)") return <Rjp/>;
};
