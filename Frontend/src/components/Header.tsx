import "../App.css";

export const Header = () => {
  return (
    <div className="fixed flex justify-between items-center h-12 bg-white shadow-lg w-full px-6">
      <div className="flex items-center">
        <img className="w-7" src="./src/assets/icon.png" alt="icon.png" />
        <h1 className="ml-3 text-2xl font-bold text-[#5544D7]">DigiVoter</h1>
      </div>
      <div className="flex items-center">
        <img className="h-6 mr-3" src="./src/assets/language.png" alt="Language Icon" />
        <div>
          <select className="form-select text-md">
            <option value="en">English</option>
            <option value="hn">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
