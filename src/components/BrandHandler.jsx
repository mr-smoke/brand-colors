import MainContext from "../MainContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoShareSocial } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";

const BrandHandler = () => {
  const { selectedBrand, setSelectedBrand } = useContext(MainContext);

  return (
    <div>
      {selectedBrand.length > 0 && (
        <div className="selected-brands">
          <select>
            <option value="css">CSS</option>
            <option value="scss">SCSS</option>
            <option value="less">LESS</option>
          </select>
          <Link to="/" className="download-brands">
            <IoMdDownload fill="#000" />
          </Link>
          <Link
            to={`/saved/${selectedBrand.join(",")}`}
            className="share-brands"
          >
            <IoShareSocial fill="#000" />
          </Link>
          <div className="cancel-brands" onClick={() => setSelectedBrand([])}>
            <IoClose className="cancel" />
            <span>{selectedBrand.length} brands collected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandHandler;
