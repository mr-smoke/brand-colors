import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import CopyNotification from "./CopyNotification";
import { getContrast } from "../helpers";
import MainContext from "../MainContext";
import { useContext } from "react";

const Brand = ({ brand }) => {
  const { selectedBrand, toggleSelectedBrand } = useContext(MainContext);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

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
            {copied && <CopyNotification color={copiedColor} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
