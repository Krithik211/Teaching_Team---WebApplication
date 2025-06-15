# Teaching Team (TT) Full Stack Application

## Project Overview

This full stack web application is a continuation of the front-end prototype from Assignment 1. It facilitates a tutor hiring system called **Teaching Team (TT)**. The platform supports three types of users—candidates, lecturers, and administrators—and is built using the required technology stack:

- **Frontend**: React TypeScript
- **Backend**: Node.js, Express, TypeORM
- **Database**: Cloud MySQL

This application was developed using RESTful architecture for core TT functionality and GraphQL for the admin dashboard (HD section).

## Tech Stack

| Layer         | Technology                     |
|--------------|---------------------------------|
| Frontend     | React (TypeScript)              |
| Backend      | Node.js + Express               |
| ORM          | TypeORM                         |
| Database     | Cloud MySQL (phpMyAdmin)        |
| Admin API    | GraphQL (Apollo Server/Client)  |

## Project Structure

├── client/                    # React TS Frontend (TT website)
│   ├── components/
│   ├── pages/
│   └── services/
├── server/                    # Node + Express + TypeORM Backend
│   ├── src/
│   │   ├── entities/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── data-source.ts
├── admin-client/             # React TS Frontend for Admin Dashboard
├── admin-server/             # GraphQL API Server for Admin
└── ERD.pdf                   # ER Diagram of the database


**Backend (Node.js + TypeORM)

cd server
npm install
npm run dev

**Frontend (React)

cd client
npm install
npm run dev

**Admin Server (GraphQL)

cd admin-server
npm install
npm run dev

**Admin Dashboard (React)

cd admin-client
npm install
npm run dev

**Environment Variables
Create .env files in the server/ and admin-server/ directories with the following fields:

**env
# For server/.env
DB_HOST=209.38.26.237
DB_PORT=3306
DB_USER=<your_db_username> #S4001201
DB_PASSWORD=<your_db_password> #Nihil@01
DB_NAME=<your_db_name>	#S4001201
PORT = 3002

If the backend runs on port other than 3002 then change the backend api port on client folder services/api.ts file. 

**ER Diagram
├── server/ER_Diagram 

                  

