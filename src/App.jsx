import "./App.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SavedBrands from "./components/SavedBrands";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContext from "./MainContext";
import { useState } from "react";
import BrandsData from "./brands.json";

function App() {
  let brandsArray = [];
  Object.keys(BrandsData).forEach((key) => {
    brandsArray.push(BrandsData[key]);
  });
  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const toggleSelectedBrand = (slug) => {
    if (selectedBrand.includes(slug)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== slug));
    } else {
      setSelectedBrand([...selectedBrand, slug]);
    }
  };

  const data = {
    brands,
    selectedBrand,
    setSelectedBrand,
    toggleSelectedBrand,
  };

  return (
    <>
      <MainContext.Provider value={data}>
        <div className="overlay">
          <Sidebar />
          <Router>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/saved/:slugs" element={<SavedBrands />} />
            </Routes>
          </Router>
        </div>
      </MainContext.Provider>
    </>
  );
}

export default App;
