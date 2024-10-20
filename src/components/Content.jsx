import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MainContext from "../MainContext";
import { CiSearch } from "react-icons/ci";
import { VList } from "virtua";
import { useDebounce } from "use-debounce";

const Brand = lazy(() => import("./Brand"));
const BrandHandler = lazy(() => import("./BrandHandler"));

const Content = () => {
  const { brands, selectedBrand } = useContext(MainContext);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [searchedBrand, setSearchedBrand] = useState([]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setSearchedBrand(brands);
    } else {
      setSearchedBrand(
        brands.filter((brand) =>
          brand.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }
  }, [debouncedSearch, brands]);

  const memoizedBrands = useMemo(() => {
    return searchedBrand.map((brand, i) => (
      <Brand key={i} brand={brand}></Brand>
    ));
  }, [searchedBrand]);

  return (
    <div className="main-content">
      <header className="header">
        <div className="search-bar">
          <div className="icon">
            <CiSearch size={32} />
          </div>
          <input
            type="text"
            placeholder="Search for colors..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {selectedBrand.length > 0 && (
          <Suspense fallback={<div>Loading...</div>}>
            <BrandHandler />
          </Suspense>
        )}
      </header>
      {searchedBrand.length === 0 ? (
        <div className="empty">
          <h1>No brands found</h1>
        </div>
      ) : (
        <VList style={{ maxHeight: 890 }}>{memoizedBrands}</VList>
      )}
    </div>
  );
};

export default Content;
