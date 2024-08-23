import BrandHandler from "./BrandHandler";
import Brand from "./Brand";
import { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import { CiSearch } from "react-icons/ci";
import { VList } from "virtua";

const Content = () => {
  const { brands, selectedBrand } = useContext(MainContext);

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
        {selectedBrand.length > 0 && <BrandHandler />}
      </header>
      {searchedBrand.length === 0 && (
        <div className="empty">
          <h1>No brands found</h1>
        </div>
      )}
      {searchedBrand.length > 0 && (
        <VList style={{ maxHeight: 890 }}>
          {searchedBrand.map((brand, i) => (
            <Brand key={i} brand={brand}></Brand>
          ))}
        </VList>
      )}
    </div>
  );
};

export default Content;
