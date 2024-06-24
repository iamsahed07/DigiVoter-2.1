import { useState } from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [signupChoice, setSignupChoice] = useState("aadhaar");
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5 bg-blue-300 ">
      <img 
      className="w-12 mt-6 rounded-full md:w-20 md:mt-10" src="/src/assets/pfp2.png" alt="" />
      <img 
      className="hidden mt-6 rounded-full w-9 md:w-20 md:mt-10" 
      src="./src/assets/profile-pic1.jpg" alt="" />
      <Container className={"md:w-[25%] bg-white w-[90vw] px-4 rounded-lg my-2 shadow-lg" } >
        <h1 className="pt-5 pb-4 font-semibold ">Sign in to your account!</h1>
        <div className="flex justify-center mb-4 ">
        
          <input type="radio" 
          id="mobile-number" 
          name="choice" 
          value= "mobile-number"
          checked={signupChoice==="mobile-number"}
          onChange={()=>setSignupChoice("mobile-number")}
          className="hidden" />

          <label htmlFor="mobile-number"
          className={`py-2 w-[50%] font-medium text-sm text-center
          ${signupChoice==="mobile-number"?"bg-[#116ACF] text-white":"bg-white text-blue-600"} border-none rounded-lg`}>
          Moblie Number
          </label>

          <input type="radio" 
          id="aadhaar" 
          name="choice" 
          value= "aadhaar"
          checked={signupChoice==="aadhaar"}
          onChange={()=>setSignupChoice("aadhaar")}
          className="hidden" />

          <label htmlFor="aadhaar"
          className={`py-2 w-[50%] font-medium text-sm text-center
           ${signupChoice==="aadhaar"?"bg-[#116ACF] text-white":"bg-white text-blue-600"} border-none rounded-lg`}>
          Aadhar number
          </label>
         
        </div>
        <form action="">
        {signupChoice==="mobile-number"
        ?<input
        type="text"
        name="mobile-number"
        className="block w-full px-3 py-1 my-2 text-sm outline-none border-[2px] focus:bg-[#E9ECF1] border-gray-200 rounded-lg disabled:opacity-50 disabled:pointer-events-none "
        placeholder="Mobile Number"
        />
        :<input
        type="text"
        name="aadhaar"
        className="block w-full px-3 py-1 my-2 text-sm outline-none border-[2px] focus:bg-[#E9ECF1] border-gray-200 rounded-lg disabled:opacity-50 disabled:pointer-events-none "
        placeholder="Aadhaar"
      />
        }
        
        <input
          type="text"
          name="PIN"
          className="block w-full px-3 py-1 my-2 text-sm  outline-none border-[2px] focus:bg-[#E9ECF1] border-gray-200 rounded-lg disabled:opacity-50 disabled:pointer-events-none "
          placeholder="6 digit security PIN"
        />
        <button className="bg-[#116ACF] text-[#E7FFF2] py-2 my-5 rounded-md w-[100%]">
          Sign up
        </button>
       </form>
      </Container>
      <div className="flex gap-1">
        <h2 className="font-bold text-[#000005] ">Already registered?</h2>
        <button 
        className="text-[#4944D2] font-bold"
        onClick={()=>navigate("/")}
        >
        Login
        </button>
      </div>
      
    </div>
  );
};
