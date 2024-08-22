import BrandHandler from "./BrandHandler";
import Brand from "./Brand";
import { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import { CiSearch } from "react-icons/ci";

const Content = () => {
  const { brands } = useContext(MainContext);

  const [search, setSearch] = useState("");
  const [searchedBrand, setSearchedBrand] = useState([]);

  useEffect(() => {
    if (search === "") {
      setSearchedBrand(brands);
    } else {
      setSearchedBrand(
        brands.filter((brand) =>
          brand.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, brands]);

  return (
    <div className="main-content">
      <header className="header">
        <div className="search-icon">
          <CiSearch />
        </div>
        <input
          type="text"
          placeholder="Search for colors..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <BrandHandler />
      </header>
      {searchedBrand.map((brand, key) => (
        <Brand key={key} brand={brand}></Brand>
      ))}
    </div>
  );
};

export default Content;
