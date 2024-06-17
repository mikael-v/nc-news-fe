import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Comments from "./components/Comments.jsx";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/api/articles/:article_id/comments"
            element={<Comments />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
