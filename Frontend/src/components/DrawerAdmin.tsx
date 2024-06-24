import { NavLink, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdPoll } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export const DrawerAdmin = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    const result = confirm("Are you sure you want to log out?");
    if (result) {
      navigate("/");
      localStorage.clear();
    }
  };
  return (
    <div className="relative col-span-2">
      <nav className="h-screen bg-[#F2F3F6] flex flex-col items-start px-5 pt-7 drop-shadow-2xl fixed text-[#9A9FA3] text-sm font-bold">
        <NavLink
          to="admin-dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-[100%] bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-[100%] my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdSpaceDashboard />
          </IconContext.Provider>
          <h3 className="ml-2">Dashboard</h3>
        </NavLink>
        <NavLink
          to="election-management"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-[100%] bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-[100%] my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <FaBookBookmark />
          </IconContext.Provider>
          <h3 className="ml-2">Election Management</h3>
        </NavLink>
        <NavLink
          to="candidate-management"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-[100%] bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-[100%] my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdAdminPanelSettings />
          </IconContext.Provider>
          <h3 className="ml-2">Candidate Management</h3>
        </NavLink>
        <NavLink
          to="voter-management"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-[100%] bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-[100%] my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <FaUsers />
          </IconContext.Provider>
          <h3 className="ml-2">Voter Management</h3>
        </NavLink>
        <NavLink
          to="results-analytics"
          className={({ isActive }) =>
            isActive
              ? "flex py-2 px-3 my-2 shadow-xl w-[100%] bg-[#4a90e2] text-white rounded-md"
              : "flex py-2 px-3 w-[100%] my-2 hover:bg-[#3498db] hover:text-white hover:rounded-md"
          }
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdPoll />
          </IconContext.Provider>
          <h3 className="ml-2">Results / Analytics</h3>
        </NavLink>
        <div
          className="flex py-2 px-3 my-2 w-[100%] hover:bg-[#3498db] hover:text-white hover:rounded-md"
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

