# multi-tenant-task-list

## November 9, 2020

### By: Ted Fossum

[LinkedIn](https://www.linkedin.com/in/tedfossum/)
***
### Overview
This product (Traxer) is a multi-tenant task list tool.With an emphasis on simplicity, users can create and assign tasks to their colleagues within a clean, simple, web interface. 

***

### Technologies
* Express
* MongoDB
* Mongoose
* Node.js
* REACT
* HTML/CSS/JavaScript
***
## Instalation
### Node.js/MongoDB
Traxer expects Node.js and MongoDB to already be installed.
For Node.js instructions:
https://nodejs.org/en/download/

For MongoDB instructions:
https://www.mongodb.com

### Traxer Installation
1. Clone this repo
2. Download and install back-end dependencies:
```
npm i
```
3. Download and install front-end dependencies:
```
cd ./src
npm i
```

## Configuration
### Back-end
By default, Traxer's Express backend is configured to listen on port:3001 in development. This can be changed in ```<project-root>server.js```. Look for this line:
```
const PORT = process.env.PORT || 3001
```
### Front-end
The React front-end is configured to listen on port:3000 by default. Changin this is possible, but intricate. Refer to the most recent React documnentation for instructions if necessary
***
### Entity Relationships
![ER Diagram](/ER_Diagram.png)
***
### Component Diagram
![Component Diagram](/Component_Diagram.png)
***

### Wireframes
![Main Page](/Traxer_Main.png)
![Welcome Page](/wf_Welcome.png)
![Main Page](/wf_MainPage.png)
![Task Details](/wf_Task_Details.png)
***

### Trello Board
[Go here for the project Trello board](https://trello.com/b/9DC9kJnL/multi-tenant-task-list)
***

### To Do List
 - [x] Create project skeleton
 - [x] User can login/logout
 - [x] User can view tasks related to them
 - [x] User can CRUD tasks
 - [x] User can view stats regarding their related tasks





