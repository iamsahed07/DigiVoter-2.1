import { NavLink, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaCheckSquare } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { MdPoll } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";

export const DrawerVoter = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const result = window.confirm("Are you sure you want to log out?");
    if (result) {
      navigate("/");
      localStorage.clear();
    }
  };

  return (
    <div className="relative col-span-2">
      <nav className="h-screen bg-[#F2F3F6] flex flex-col items-start px-5 pt-7 drop-shadow-2xl fixed text-[#9A9FA3] text-sm font-bold">
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-full bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-full my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdDashboardCustomize />
          </IconContext.Provider>
          <h3 className="ml-2">Home</h3>
        </NavLink>
        <NavLink
          to="Information"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-full bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-full my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <RiInformationFill />
          </IconContext.Provider>
          <h3 className="ml-2">Information</h3>
        </NavLink>
        <NavLink
          to="voter-registration"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-full bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-full my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <FaCheckSquare />
          </IconContext.Provider>
          <h3 className="ml-2">Voter Registration</h3>
        </NavLink>
        <NavLink
          to="voting-area"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-full bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-full my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdHowToVote />
          </IconContext.Provider>
          <h3 className="ml-2">Voting Area</h3>
        </NavLink>
        <NavLink
          to="voting-results"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-full bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-full my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdPoll />
          </IconContext.Provider>
          <h3 className="ml-2">Result</h3>
        </NavLink>
        <div
          className="flex py-2 px-3 my-2 w-full hover:bg-[#3498db] hover:text-white rounded-md cursor-pointer"
          onClick={logoutHandler}
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <IoLogOutOutline />
          </IconContext.Provider>
          <h3 className="ml-2">Log out</h3>
        </div>
      </nav>
    </div>
  );
};
