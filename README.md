# Banana2

Made to bring a smile to your face (the app is aptly named after a rotated
banana that looks like a smile), banana2 is a web app where you can view an
assortment of random memes, favorite them, and save them onto up to 5 custom
pages. To gain access to all of these features, users must register with the web
app.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## General info

This project is for the final project assignment of course CS3200 Database Design. New users can be registered with our web app. The admin user is built into the web app with username and password both being "admin".

## Technologies

Please install at least NodeJS version 14 or above before proceeding (or the LTS version). Link to download is [here](https://nodejs.org/en/download/).

- Axios - version 0.24.0
- dotenv - version 10.0.0
- mysql2 - version 2.3.3
- node-sass - version 6.0.1
- react - version 17.0.2
- react-dom - version 17.0.2
- react-router-dom - version 6.0.2
- react-scripts - version 4.0.3
- sass - version 1.44.0
- cors - version 2.8.5
- express - 4.17.1

## Setup

If you don't have MySQL Workbench installed already, go to [this link](https://dev.mysql.com/downloads/workbench/) to install it.

To install, first git clone this project onto your local machine. If you already download the zip file and extracted it, skip this step and `cd` into the root directory for this repository (`banana2`).

```
git clone git@github.com:jpwaves/banana2.git
```

After cloning the repository, `cd` into the `banana2` directory and run `npm install` or `npm i` in the terminal to install all the necessary dependencies for the web app. Then `cd` into the `server` directory (which is within `banana2`) and create a file called `.env` and copy and paste the following template code into that file:

```
PORT=3306
DB_HOST="localhost"
DB_USER=<INSERT_DB_USER>
DB_PWD=<INSERT_DB_USER_PASSWORD>
DB_NAME="banana"

SERVER_PORT=3001
API_KEY=""
```

Side Note: Although we included the API_KEY in our `.env` file, it is not necessary to run the app as we only used it to collect data for our MySQL database.

Replace "<INSERT_DB_USER>" and "<INSERT_DB_USER_PASSWORD>" with the username and password for the MySQL user you are using to connect with your MySQL database and MySQL Workbench; don't forget to put the username and password in double quotes.

Then, open up MySQL Workbench and connect to MySQL using the user and password that you will use for this web app. Within MySQL Workbench, navigate to the "Server" menu dropdown, and then select "Data Import". In the tab that opens up, choose "Import from Self-Contained File" and select the `banana-dump.sql` dump file that was provided with the project submission, and import the dump file.

Back in terminal, have 2 terminal windows open at the same time; one window located in the `server` directory and the other window in the root directory of this repository (`banana2`). In the `server` directory run the following command to start the Express server and establish a connection between the front-end and back-end/MySQL database: `node index.js`. Afterwards, in the `banana2` directory, run the following command to start up the web app: `npm start`.

NOTE: If `node index.js` doesn't work in the `server` directory, you may need to run `npm install` within the `server` directory and then run `node index.js`.

Then, the app should be running and connected with the database.

## Features

List of features ready

- View randomly generated memes
- Favorite memes
- Create pages to display specific memes
- View all pages created (can create 5 pages max)
- Update page title and description
- Automatically get and display badges in a list on the dashboard
- Remove memes from a page
- Register and log in users
- Admin can only access the admin dashboard where you can create, read, and delete memes.

## Status

Project is: _finished_

## Contact

Created by [@alyssamui](https://github.com/alyssamui) and [@jpwaves](https://github.com/jpwaves)
