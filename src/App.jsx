import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from "./components/Articles.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/api/articles" element={<Articles />} />
          <Route path="/" element={<Articles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
