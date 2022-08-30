# sinato

## Installation
1) Run npm init or npm init -y from the command line to initialize a new Node.js package. Your entry point for the program should be server.js. If you use the npm init -y option, remember to manually update your package.json to "main": "server.js" instead of "main": "index.js".

2) Once that's done, update package.json with the following script:

"start": "node server.js"

3) npm install express sequelize mysql2

4) From the root directory of your project, type mysql -u root -p and press Return.

Enter your MySQL password and press Return again to enter the MySQL shell environment.

To create the database, execute the following command:

source db/schema.sql

5) npm install dotenv

6) DB_NAME='sinato_db'
DB_USER='your-mysql-username'
DB_PASSWORD='your-mysql-password'