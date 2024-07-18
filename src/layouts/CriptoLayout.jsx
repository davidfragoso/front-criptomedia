import React from "react";
import { Routes, Route } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import CryptoTable from "../components/CriptoComponents/Index/CryptoIndex";
import NftCollections from "../components/CriptoComponents/Nft/Nft";
import NFTNewsSection from "../components/CriptoComponents/News/News";
import "../css/SocialLayout.css";
import "../App.css";
import Configuration from "../components/SocialComponents/Configuration/configuration";

const CriptoLayout = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div className="appContainer">
      <Navbar layoutType="crypto" />
      <div className={`mainContainer ${isTabletOrMobile ? "tabletOrMobile" : ""}`}>
        {!isTabletOrMobile && <Sidebar layoutType="crypto" />}
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/news" element={<NFTNewsSection />} />
            <Route path="/nft" element={<NftCollections />} />
            <Route path="/settings" element={<Configuration />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const MainContent = () => {
  const isMobile = useMediaQuery("(max-width: 400px)");
  return (
    <>
      <div className="content">
        <div className="centerColumn">
          <CryptoTable />
        </div>
      </div>
    </>
  );
};

export default CriptoLayout;
