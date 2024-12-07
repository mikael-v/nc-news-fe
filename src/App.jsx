import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Articles from "./components/Articles.jsx";
import Header from "./components/Header.jsx";
import OneArticle from "./components/OneArticle.jsx";
import Comments from "./components/Comments.jsx";
import NotFound from "./components/NotFound.jsx";
import UserLogin from "./components/UserLogin.jsx";

function App() {
  const [articleCategory, setArticleCategory] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUser, setcurrentUser] = useState("");

  return (
    <BrowserRouter>
      <Header
        setArticleCategory={setArticleCategory}
        articleCategory={articleCategory}
      />
      <Routes>
        <Route
          path="/"
          element={
            <UserLogin
              setcurrentUsername={setCurrentUsername}
              currentUsername={currentUsername}
              setcurrentUser={setcurrentUser}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/articles"
          element={
            <Articles
              setArticleCategory={setArticleCategory}
              articleCategory={articleCategory}
            />
          }
        />
        <Route exact path="/articles/:article_id" element={<OneArticle />} />
        <Route
          path="/articles/:article_id/comments"
          element={
            <Comments
              setcurrentUsername={setCurrentUsername}
              currentUsername={currentUsername}
              setcurrentUser={setcurrentUser}
              currentUser={currentUser}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
