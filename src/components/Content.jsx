import Header from "./Header";
import Brand from "./Brand";
import { useContext } from "react";
import MainContext from "../MainContext";

const Content = () => {
  const { brands, selectedBrand, toggleSelectedBrand } =
    useContext(MainContext);

  return (
    <div className="main-content">
      <Header />
      {brands.map((brand, key) => (
        <Brand
          key={key}
          brand={brand}
          selectedBrand={selectedBrand}
          toggleSelectedBrand={toggleSelectedBrand}
        ></Brand>
      ))}
    </div>
  );
};

export default Content;
