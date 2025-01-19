# language-learning-fullstack-app aka LLFSA

LLFSA is a web application designed to be used for learning vocabulary in different languages. The app has two views, a learning view and an admin view. In the learning view, you are given a word and it's language, and must then answer it in the given language. And in the admin view you manage what words are currently available in learning view. In both learning and administration, you can also mark and filter words with different tags.

LLFSA on render.com: https://language-learning-fullstack-app.onrender.com/
_(It may take bit to load..)_

## How to install and run

### 1. Clone the repo

Download the projects onto where you plan on running it.

When run locally the backend will use port 5678 and the frontend will use port whichever port Vite gives it, but usually 5173 or 5174. The frontend also runs a proxy to port 5678 to skip the need for CORS.

### 2. Npm install

To install all necessary Node modules, run the command `npm install` in the project root directory.

### 3.1. Run with Node

To run the app locally, just run the command `npm start` in the project root directory. This start both the back and the front end using the [concurrently](https://www.npmjs.com/package/concurrently) module. The console should then tell you which ports the app is using.

You can also, if you prefer, run the back- and frontend as seperate processess. You can do this by running the commands `npm run start-backend` to start the backend and `npm run start-frontend` to start the frontend in the project root directory.

### 3.2. Run with Docker

LLFSA also comes Docker ready. Just run `docker build -t llfsa .` in the project root directory to build the app image, and then run it with `docker run -p 5678:5678 llfsa`. This mirrors the Docker containers port 5678 to your machine's port 5678. The app will then be accessible through port 5678.

### 4. Enjoy

The app comes with some ready example data. Go see if you know your bracket names in finnish, and then add your own vocabulary to learn.

## The making of

### The backend

The backend is rather simple. It uses:

- [Express](https://expressjs.com/) for routing API requests.
- [SQLite3](https://sqlite.org/) for handling everything SQL.
- [Joi](https://joi.dev/) for validation.

If you want to look through it's code:

- **_database.js_** is where the SQL database is initalized with example data.
- **_validation.js_** is where the validation is defined.
- **_router.js_** is where all the API routes are defined, and where requests are validated and then sent to the SQL handler.
- **_handler.js_** is where all SQL querying after the database initalization happens.
- **_shutdown.js_** is where graceful shutdown is setup.
- **_index.js_** is where the app startup happens and everything comes together.

### The frontend

The frontend is also pretty simple. It's mostly self-made with React but does use [React Router](https://reactrouter.com/) for the two views, and all CSS is made and compiled with [Sass](https://sass-lang.com/).

Explaining every component in the fronend would take a bit too long, but the important ones are:

- **_App.jsx_** where the React Router is setup.
- **_UserView.jsx_** is the app's learning view.
- **_AdminView.jsx_** is the app's admin view.
- **_css/llfsa.scss_** is the app's css.

### The journey

Due to personal hardships around the New Year's, this project had to be scaled down from what I had originnaly planned for it, and was mostly completed during week 3 of 2025 to meet it's deadline.

While a lot of this is still new to me as a developer, I figures out most of the quirks of JavaScript and React working on another project preceding this one, so there weren't too many difficulties in development.
