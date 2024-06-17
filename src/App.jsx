import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from "./components/Articles.jsx";

function App() {
  return (
    <>
      {/* <Header></Header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/api/articles" element={<Articles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
