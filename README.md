Deployed Site URL: https://mikael-northcoders-news.netlify.app/
Backend Data: https://nc-news-project-hvpy.onrender.com/api

This app uses Node v21.7.1

This appplication displays data from a backend server for news articles, to use it navigate between the header buttons to view articles sorted by different topics, Home will redirect to the root page which displays all the articles. CLicking a specific one will take you to that article's page where further information such as comments and functionality to post and delete comments can be used. If a user were to attempt to input an invalid url, such as a non-existing path, topic or article they will be directed to appropriate error messages and the option to return to the homepage.

Follow these steps to locally run the app:
 - fork the repo from github
 - in your computer's terminal cd into the directory where you would like to clone the file (e.g cd Northcoders/Project)
  - in the correct directory run "git clone https://github.com/mikael-v/nc-news-fe.git" and then open the file using the editor of your choice
 - in the editor's terminal run npm install -D 
 - Using npm, install the following libraries: axios, react, react-router-dom, react-google-material-icons
 - run npm run dev and a link to a locally hosted version of the site will be made available in the terminal


This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
