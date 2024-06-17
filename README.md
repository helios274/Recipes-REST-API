# Recipes REST API

## Features

- Swagger UI API documentation
- User Authentication using Passport.js
- CRUD operations
- Request data validation
- Paginated response data
- Admin routes

## Tech Stack

- Express.js

- Passport.js

- MongoDB

- Swagger UI

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`: Indicate whether the application is running in development (true) or production (false) mode

`PORT`: Specifies the port number that the application will listen on for incoming connections. Default value 3000

`PRODUCTION_URL`: Specifies the URL of the production application. If the app is in development, ignore this.

`MONGODB_URI`: Your MongoDB connection URI without database name.

`DB_NAME`: Your MongoDB database name.

`COOKIE_SECRET`: Specifies the secret key used to sign cookies.

`SESSION_MAX_AGE`: Specifies the maximum age of a session, in milliseconds.

## Run Locally

Clone the project

```bash
  git clone https://github.com/helios274/Recipes-REST-API.git
```

Go to the project directory

```bash
  cd Recipes-REST-API
```

Install dependencies

```bash
  npm install
```

Start the server (nodemon)

```bash
  npm run dev
```

or

Start the server (node)

```bash
  npm run start
```
