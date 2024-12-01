# Project Name: Groupomania #

<img src="./frontend/src/assets/images/groupomania.png" alt="Groupomania Project" width="80%" />


Groupomania is an internal social network for Groupomania's employees that I've developed as the last project of my remote training at OpenClassrooms. The aim of this project is to allow employees to interact with each other by creating personal acccounts, posting stories, being able to interact to stories that others share and the presence of an admin that must be able to manage users content.

The frontend of the app was developed with Vue3, Node.js for its API and MySql for the database. For the desgin part, there are no specific requirements in terms of graphic assepects, so the design of the app was free choice.

## Prerequisites : ##

Here are the dependencies that you need to have pre-installed on your machine:

    1- Node.js version 16.13.1 or v16.13.0
    2- MySql version 8.0.27 
    2- Vue.js @vue/cli 4.5.15

## Database : ##

In order for this app to work as it intended, you have to create the following elements:
    -1 Go to the `user.schema.sql` file in the root of the backend directory and copy the first predefined command to create your database, then copy the other predifined sql commandse one by one to create the required tables.
    -2  Create an `.env` file in the root of the project
    -3  Inside the `.env` file, create the following environment variables: 

    DB_HOST = <db-host-name>
    DB_USER = <db-user-name>
    DB_PASSWORD = <db-user-password>
    DB_NAME = <db-name>

    USER_TOKEN = <user-token>

You can also see these structure inside the dbAndAuthStructure.env file

Note: Replace only the values of these variables do not change their names !!!

## Backend Installation : ##

Once the repo is cloned, go to the backend directory and run `npm install` to install all the dependencies and devDependencies needed for the backend server.

### Usage ####

You can then run `nodemon`. The app should run on the `default` port `3001` with a sign printed to the console `Connected to MySql...`.

## Frontend Installation : ##

Once the repo is cloned, go to the frontend directory and run `npm install` to install all the dependencies and devDependencies needed for the frontend app. 

### Usage ####

You can then run `npm run serve`. The app should run on `localhost` with the default port `8080`.

