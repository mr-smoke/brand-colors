import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContext from "./MainContext";
import { lazy, Suspense, useEffect, useState } from "react";
import BrandsData from "./brands.json";
import CopyNotification from "./components/CopyNotification";
import Sidebar from "./components/Sidebar";

const Content = lazy(() => import("./components/Content"));
const SavedBrands = lazy(() => import("./components/SavedBrands"));

function App() {
  let brandsArray = [];
  Object.keys(BrandsData).forEach((key) => {
    brandsArray.push(BrandsData[key]);
  });
  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  const toggleSelectedBrand = (slug) => {
    if (selectedBrand.includes(slug)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== slug));
    } else {
      setSelectedBrand([...selectedBrand, slug]);
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const data = {
    brandsArray,
    brands,
    setBrands,
    selectedBrand,
    setSelectedBrand,
    toggleSelectedBrand,
    setCopiedColor,
    setCopied,
  };

  return (
    <>
      <MainContext.Provider value={data}>
        <div className="overlay">
          {copied && <CopyNotification color={copiedColor} />}
          <Sidebar />
          <Suspense fallback={<div>Loading...</div>}>
            <Router>
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/saved/:slugs" element={<SavedBrands />} />
              </Routes>
            </Router>
          </Suspense>
        </div>
      </MainContext.Provider>
    </>
  );
}

export default App;
