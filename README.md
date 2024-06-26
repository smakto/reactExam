# reactExam

Personal game library by Šarūnas Raižys.

# Introduction

This is a project made for a final assignment of front-end studies in codeAcademy.
This project is personal game library that can be used as notebook of games already played, currently played or some that are in your personal wishlist for tracking or sharing with your friends as a suggestion for a gift.

# Getting started - Front-end

This project uses React & Vite setup for front-end.
Installation guide can be found at [https://vitejs.dev/guide/]

Dependencies & versions used:
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-lazy-load-image-component": "^1.6.0",
"react-router-dom": "^6.23.1",
"styled-components": "^6.1.11"

Open folder "reactExam" in terminal.
Enter "npm instal" to instal project packages.
Enter "npm run dev" to launch project.

# Getting started - Back-end

For back-end Node.JS + express + MongoDB was used.
Installation guides:
Node [https://nodejs.org/en/learn/getting-started/how-to-install-nodejs]
MongoDB [https://www.mongodb.com/docs/manual/installation/]

Dependencies & versions used:
"cors": "^2.8.5",
"dotenv": "^16.4.5",
"express": "^4.19.2",
"mongodb": "^6.7.0",
"mongoose": "^8.4.1",
"nodemon": "^3.1.3"

Open folder "backend" in terminal.
Enter "npm instal" to instal project packages.
Enter "npx nodemon" to run the server.

# Server

API used in this project is exported as .JSON file and can be found in [/backend/exportedDatabase/reactExamDB.gamesMain.json].
This file can be imported in MongoDB for further development.

# Build

Project has 3 pages:

1. MainPage.jsx - used to render all of game cards, based on selected categories and filter or search inputs.
2. AddGamePage.jsx - form page to enter new game into database.
3. SingleGame.jsx - page dedicated to single game. Accessible by clicking on game card in main page. Page consists of game information & notes

Reusable components can be found in [/frontend/reactExam/src/components].
If component is not used in another .jsx file it is created in the same file and not exported.

Hooks can be found in [/frontend/reactExam/src/hooks]:

1. useData.js - hook that handles CRUD operations (GET/POST/DELETE/PATCH).
2. useSearch.js - hook that is used for handling search function.
3. useResetButtons.js - handling reset of buttons in main page.

Exception being useReducer and useContext hooks which has dedicated file "useContext.js" which can be found in [/frontend/reactExam/src/contexts] folder.

# Styles

Plain .css was used for design of this project.
Most components has dedicated .css file that can be found in [/frontend/reactExam/src/styles].
Several global styles applied are included in "App.css" and "index.css".
