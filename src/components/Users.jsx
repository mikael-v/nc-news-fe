// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const newsApi = axios.create({
//   baseURL: "https://nc-news-project-hvpy.onrender.com/api",
// });

// function Users() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     newsApi.get("/users").then((result) => {
//       setUsers(result.data);
//     });
//   }, []);

//   return (
//     <ul>
//       {users.map((user) => (
//         <li key={user.username}>{user.username}</li>
//       ))}
//     </ul>
//   );
// }

// export default Users;
