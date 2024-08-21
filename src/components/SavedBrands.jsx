import { useNavigate, useParams } from "react-router-dom";
import MainContext from "../MainContext";
import { useContext, useEffect } from "react";
import Brand from "./Brand";

const SavedBrands = (props) => {
  const { selectedBrand, setSelectedBrand, brands } = useContext(MainContext);
  const { slugs } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedBrand(slugs.split(","));
  }, []);

  return (
    <>
      <div className="main-content">
        {selectedBrand.map((slug, key) => {
          let brand = brands.find((brand) => brand.slug === slug);
          return (
            <Brand
              key={key}
              brand={brand}
              selectedBrand={selectedBrand}
              toggleSelectedBrand={() => {}}
            ></Brand>
          );
        })}
      </div>
    </>
  );
};

export default SavedBrands;
