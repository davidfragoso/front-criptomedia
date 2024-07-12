import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocialLayout from "./layouts/SocialLayout";
import Login from "./components/Authentication/Login/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<SocialLayout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
