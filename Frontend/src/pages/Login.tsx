import { useState } from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/auth";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const [loginChoice, setLoginChoice] = useState("aadhaar");
  const [loginInfo, setLoginInfo] = useState({
    mobile: "",
    aadhaar: "",
    pin: "",
  });

  const navigate = useNavigate();

  
  const handleLogin = async () => {
    try {
      let response;
      if (loginChoice === "aadhaar") {
        response = await client.post("/auth/sign-in", {
          adhar: loginInfo.aadhaar,
          token: loginInfo.pin,
        },{
          params:{
            useAdhar:'yes',
            useMobile:'no'
          }
        });
      } else {
        response = await client.post("/auth/sign-in", {
          mobile: loginInfo.mobile,
          token: loginInfo.pin,
        },{
          params:{
            useAdhar:'no',
            useMobile:'yes'
          }
        });
      }
      localStorage.setItem("token", response.data.token);
      console.log(response.data.jwttoken);
      dispatch(updateProfile(response.data.profile))
      navigate("/home")
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };
  const handleGetOtp = async () => {
    let isValid = false;
    if (loginChoice === "aadhaar") {
      isValid = loginInfo.aadhaar.length === 12;
    } else {
      isValid = loginInfo.mobile.length === 10;
    }
    if (!isValid) {
      toast.error("Invalid Aadhaar number or mobile number.");
      return;
    }
    if(loginChoice==="aadhaar"){
      try{
        const { data } = await client.post("/auth/sendVerificationToken", {
          adhar: loginInfo.aadhaar,
        },{
          params:{
            useAdhar:'yes',
            useMobile:'no'
          }
        });
        alert(data.message);
      }catch(error){

      }
    }else{
      try {
        const { data } = await client.post("/auth/sendVerificationToken", {
          mobile: loginInfo.mobile,
        },{
          params:{
            useAdhar:'no',
            useMobile:"yes"
          }
        });
        alert(data.message);
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      }

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="flex flex-col md:flex-row items-center justify-center md:w-[80%] w-full md:max-w-[800px] rounded-lg md:shadow-lg">
        <img
          src="./src/assets/home3.png"
          alt="Login page"
          className="flex items-center justify-center md:w-1/2 rounded-lg transition-transform transform hover:scale-105"
          style={{ objectFit: "cover" }}
        />

        <div className="w-full">
          <Container className="bg-white px-6 py-8 rounded-tl-none rounded-bl-none rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Log in to your account!
            </h1>
            <div className="flex justify-center mb-6 space-x-2">
              <input
                type="radio"
                id="mobile-number"
                name="choice"
                value="mobile-number"
                checked={loginChoice === "mobile-number"}
                onChange={() => setLoginChoice("mobile-number")}
                className="hidden"
              />
              <label
                htmlFor="mobile-number"
                className={`py-2 w-1/2 font-medium text-center cursor-pointer transition-colors ${
                  loginChoice === "mobile-number"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-blue-700"
                } rounded-l-lg hover:bg-blue-500 hover:text-white`}
              >
                Mobile Number
              </label>
              <input
                type="radio"
                id="aadhaar"
                name="choice"
                value="aadhaar"
                checked={loginChoice === "aadhaar"}
                onChange={() => setLoginChoice("aadhaar")}
                className="hidden"
              />
              <label
                htmlFor="aadhaar"
                className={`py-2 w-1/2 font-medium text-center cursor-pointer transition-colors ${
                  loginChoice === "aadhaar"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-blue-700"
                } rounded-r-lg hover:bg-blue-500 hover:text-white`}
              >
                Aadhaar Number
              </label>
            </div>
            <div className="space-y-4">
              {loginChoice === "mobile-number" ? (
                <input
                  type="text"
                  className="block w-full px-4 py-3 text-sm border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Mobile Number"
                  value={loginInfo.mobile}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, mobile: e.target.value })
                  }
                />
              ) : (
                <input
                  type="text"
                  className="block w-full px-4 py-3 text-sm border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                  placeholder="Aadhaar Number"
                  value={loginInfo.aadhaar}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, aadhaar: e.target.value })
                  }
                />
              )}
              <button
                className="w-full text-sm font-medium text-blue-700 hover:underline"
                onClick={handleGetOtp}
              >
                Get Security PIN
              </button>
              <input
                type="text"
                className="block w-full px-4 py-3 text-sm border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                placeholder="6-digit Security PIN"
                value={loginInfo.pin}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, pin: e.target.value })
                }
              />
              <button
                className="w-full py-3 mt-4 font-semibold text-white bg-blue-700 rounded-lg shadow hover:bg-blue-800 transition-colors"
                onClick={handleLogin}
              >
                Login
              </button>
              {/* Admin Login Button */}
              <button
                className="w-full py-3 mt-4 font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition-colors"
                onClick={() => navigate("/admin-login")}
              >
                Admin Login
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Login;
