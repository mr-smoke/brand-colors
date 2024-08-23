import MainContext from "../MainContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoShareSocial } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";

const BrandHandler = () => {
  const { selectedBrand, setSelectedBrand, brands } = useContext(MainContext);

  const [download, setDownload] = useState();
  const [type, setType] = useState("css");

  useEffect(() => {
    if (selectedBrand.length > 0) {
      let output = "";
      switch (type) {
        case "css":
          output += ":root {\n";
          selectedBrand.map((slug) => {
            let brand = brands.find((brand) => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `--${slug}-${key}: #${color};\n`;
            });
          });
          output += "}";
          break;

        case "scss":
          selectedBrand.map((slug) => {
            let brand = brands.find((brand) => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `\$${slug}-${key}: #${color};\n`;
            });
          });
          break;

        case "less":
          selectedBrand.map((slug) => {
            let brand = brands.find((brand) => brand.slug === slug);
            brand.colors.map((color, key) => {
              output += `@${slug}-${key}: #${color};\n`;
            });
          });
          break;
      }

      const blob = new Blob([output]);
      const url = URL.createObjectURL(blob);
      setDownload(url);

      return () => {
        URL.revokeObjectURL(url);
        setDownload("");
      };
    }
  }, [selectedBrand, type]);

  return (
    <>
      <div className="selected-brands">
        <select onChange={(e) => setType(e.target.value)}>
          <option value="css">CSS</option>
          <option value="scss">SCSS</option>
          <option value="less">LESS</option>
        </select>
        <a
          href={download}
          download={`brands.${type}`}
          className="download-brands"
        >
          <IoMdDownload fill="#000" />
        </a>
        <Link to={`/saved/${selectedBrand.join(",")}`} className="share-brands">
          <IoShareSocial fill="#000" />
        </Link>
        <div className="cancel-brands" onClick={() => setSelectedBrand([])}>
          <IoClose className="cancel" />
          <span>{selectedBrand.length} brands collected</span>
        </div>
      </div>
    </>
  );
};

export default BrandHandler;
