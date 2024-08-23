import { useParams } from "react-router-dom";
import MainContext from "../MainContext";
import { useContext, useEffect } from "react";
import Brand from "./Brand";
import BrandHandler from "./BrandHandler";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { VList } from "virtua";

const SavedBrands = () => {
  const { slugs } = useParams();
  const { selectedBrand, setSelectedBrand, brands } = useContext(MainContext);

  useEffect(() => {
    setSelectedBrand(slugs.split(","));
  }, []);

  return (
    <>
      <div className="main-content">
        <header className="header">
          <Link to="/" className="back">
            <IoArrowBack />
          </Link>
          <p className="title">All Brands</p>
          {selectedBrand.length > 0 && <BrandHandler />}
        </header>
        {selectedBrand.length === 0 && (
          <div className="empty">
            <h1>No saved brands</h1>
          </div>
        )}
        {selectedBrand.length > 0 && (
          <VList style={{ maxHeight: 890 }}>
            {selectedBrand.map((slug, key) => {
              let savedBrands = brands.find((brand) => brand.slug === slug);
              return <Brand key={key} brand={savedBrands}></Brand>;
            })}
          </VList>
        )}
      </div>
    </>
  );
};

export default SavedBrands;
