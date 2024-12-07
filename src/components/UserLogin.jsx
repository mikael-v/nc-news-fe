import axios from "axios";
import React, { useEffect, useState } from "react";

const newsApi = axios.create({
  baseURL: "https://nc-news-project-hvpy.onrender.com/api",
});

function UserLogin(params) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    newsApi.get("/users").then((result) => {
      setUsers(result.data);
    });
  }, []);

  function loginUser(event) {
    const newUsernames = users.map((currUser) => currUser.username);
    const newUsers = users.map((currUser) => currUser.name);

    if (newUsers.includes(params.currentUser)) {
      if (
        newUsers.indexOf(params.currentUser) ===
        newUsernames.indexOf(params.currentUsername)
      ) {
        console.log("Yay");
      } else {
        event.preventDefault();
        alert("Invalid User");
      }
    } else {
      event.preventDefault();
      alert("Invalid User");
    }
  }

  return (
    <>
      <form id="login-form" onSubmit={loginUser} action="articles">
        <label htmlFor="user">Name: </label>
        <input
          type="text"
          name="user"
          id="user"
          onChange={(e) => params.setcurrentUser(e.target.value)}
        />

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => params.setcurrentUsername(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
export default UserLogin;
