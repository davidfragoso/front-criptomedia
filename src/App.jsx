import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocialLayout from "./layouts/SocialLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<SocialLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
