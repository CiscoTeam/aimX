# aimX

## Description:
This is a senior capstone project for SER401. The team is working with Kyle from Cisco Systems to develop a monitoring and automation platform.

## Contributors:
- Bryan Duarte
- Vincent Goh
- Chris Carpenter
- Jaime Rabago

## Local Setup
### Installing
- Download NodeJS (32-bit): https://nodejs.org/en/download/
- Download MongoDB: https://www.mongodb.org/downloads#production

1. Install NodeJS

2. Install MongoDB and customize the directory for install to “C:/MongoDB/” preferably

3. Create a folder called “data” in "C:/" and inside the folder “data” create a folder called “db” (MongoDB requires these 2 folders to run)

4. Using a terminal, navigate into aimX/aimXApplication/WebContent/ 
While in here, type “npm install”

### Running
You will require 2 terminal windows.

1. 1st terminal window, navigate into your MongoDB/bin then type “mongod.exe”
2. 2nd terminal window, navigate into the project folder where server.js is located and type “node server.js”

3. Type localhost:3000 or whatever the port number is on the browser to demo the project.

