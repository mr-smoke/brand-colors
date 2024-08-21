import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header className="header">
      <div className="search-icon">
        <CiSearch />
      </div>
      <input type="text" placeholder="Search for colors..." />
      {/* <button className="search-btn">
        <i className="fas fa-search"></i>
        </button> */}
    </header>
  );
};

export default Header;
