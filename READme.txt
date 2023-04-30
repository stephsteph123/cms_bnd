README
Introduction
This project includes two main components: a dashboard and an Express server. The dashboard allows users to select from three different camera feeds: Live Feed to Lobby A, Live Feed to Lobby B, and Past Footage. The Express server, on the other hand, contains several middleware components and routes that handle user authentication, cookie handling, and database access.

Usage
To run this project, clone the repository to your local machine and navigate to the project directory. You will need to install the dependencies by running npm install.

Once the dependencies are installed, you can start the Express server by running npm start. This will start the server on port 3000.

To access the login, navigate to localhost:3000 in your web browser.

To access the system, you can use the following credentials within the login screen:

Username: user@example.com
Password: Test1234! (Note that the password is encrypted for security purposes.)

Dependencies
This project requires the following dependencies:

Express
Body-parser
Cookie-session
EJS
Bcrypt
Three
Files
dashboard.html: This file contains the code for the dashboard.
express_server.js: This file contains the code for the Express server.
database.js: This file contains the code for interacting with the database.
Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.
