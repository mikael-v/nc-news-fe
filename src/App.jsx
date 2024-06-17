import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
