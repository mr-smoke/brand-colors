import { useNavigate, useParams } from "react-router-dom";
import MainContext from "../MainContext";
import { useContext, useEffect } from "react";
import Brand from "./Brand";
import BrandHandler from "./BrandHandler";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const SavedBrands = (props) => {
  const { slugs } = useParams();
  const { selectedBrand, setSelectedBrand, brands } = useContext(MainContext);
  const navigate = useNavigate();

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
          <BrandHandler />
        </header>
        {selectedBrand.map((slug, key) => {
          let savedBrands = brands.find((brand) => brand.slug === slug);
          return <Brand key={key} brand={savedBrands}></Brand>;
        })}
      </div>
    </>
  );
};

export default SavedBrands;
