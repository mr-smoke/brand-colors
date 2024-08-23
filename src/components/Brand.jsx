import { IoCopyOutline } from "react-icons/io5";
import { getContrast } from "../helpers";
import MainContext from "../MainContext";
import { useContext } from "react";

const Brand = ({ brand }) => {
  const { selectedBrand, toggleSelectedBrand, setCopiedColor, setCopied } =
    useContext(MainContext);

  return (
    <div
      className={`brand ${
        selectedBrand.includes(brand.slug) ? "selected" : ""
      }`}
      onClick={() => toggleSelectedBrand(brand.slug)}
    >
      <h3>{brand.title}</h3>
      <div className="brand-colors">
        {brand.colors.map((color, key) => (
          <div
            className="box"
            key={key}
            style={{
              backgroundColor: `#${color}`,
              color: `${getContrast(color)}`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`#${color}`);
              setCopiedColor(color);
              setCopied(true);
            }}
          >
            <IoCopyOutline className="copy" />#{color}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
