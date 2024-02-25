# Node.js and Express.js Backend project using mysql

## Features

- User authentication with JWT (JSON Web Tokens)
- All user are accepted but in order to differentiate between user and teacher i have add role property in user model
- CRUD operations for assignments
- Filtering of assignments by due date, and sorting by total score
- Ability for students to submit assignments
- Ability for teachers to grade assignments and can also view student reports
- Email notifications to students when assignment created
- Only teacher can update and delete assingment

## Technologies Used

- Node.js
- Express.js
- Sequelize (with MySQL)
- JSON Web Tokens (JWT) for authentication
- Nodemailer for sending notification mail to student
- Docker for containerization

## Requirements

- Node.js installed
- MySQL installed and running
- MySQL database table sql files are present in mysql_table_sql_files folder in root directory

## Installation

1. Install dependencies:
   code: npm install

2. Create .env file

DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name
JWT_SECRET=your-secret-key
USER_EMAIL=your-mail-id
USER_PASS=your-google-account-password
