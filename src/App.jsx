import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Header her sayfada görünecek */}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} /> {/* Anasayfa */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* setUser kaldırıldı */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
