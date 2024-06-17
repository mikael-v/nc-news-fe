import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import OneArticle from "./components/OneArticle.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/api/articles/:article_id" element={<OneArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
