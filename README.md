# Kiwi-Rious Kwizzers!

Welcome to Kiwi-rious Kwizzers, a full-stack quiz application built with React, Redux, Node.js, Express.js, PostgreSQL, and Docker, and more! 

## Table of Contents

- [QuizApp](#quizapp)
  - [Table of Contents](#table-of-contents)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Set up the Dev Environment](#set-up-the-dev-environment)
      - [Setting up the Project](#setting-up-the-project)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Troubleshooting ~ T I P S ~](#troubleshooting--t-i-p-s-)
  - [(In)visible Bugs to SPOT!](#invisible-bugs-to-spot)
  - [Future Features](#future-features)



### Prerequisites

Make sure you have installed the following software:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

Have a great attitude to learn! 

### Installation

#### Set up the Dev Environment 
1. Install Node.js and NPM 
``` brew install node``` or if you're on Windows ```choco install nodejs``` 

2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Run Docker Desktop
4. Ignore our Dockerfile for now. 

5. Run containerized postgreSQL: (We'll abstract out the environmental variables in future versions.. We've broke it once, maybe we can unbreak it another day)
   ```docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres``` 
6. Connect to PostgreSQL Server
   ```docker exec -it some-postgres psql -U postgres```
7. Open up your bakery, I mean, database: 
   ```CREATE DATABASE bakery;``` 
8. Connect into that database, and follow along your application data via SQL commands! 
   ```\c bakery``` 

#### Setting up the Project
1. Clone the Project in your directory of choice 
`git clone https://github.com/katalystkat/quiz-app-test.git`

2. Change into the project directory, front end:
  
`cd /quiz-app-test/client`

3. Install & Build the front! 
```npm i ``` 
then ```npm start```

4. Open up a new tab, change into project directory, backend: 
`cd /quiz-app-test/server`

5. Build & Run the Server: 
```npm i ```
then 
```npm run build```
```npm start```


## Usage

Enter http://localhost:3000/ in a browser to take the quiz! 

You MUST create an account in order to take the quiz! Please register, then login! 


## Technologies Used

- [React](https://reactjs.org/) 
- [ReactRouter](https://reactrouter.com/)
- [Formik](https://formik.org/) 
- [Toast](https://react-hot-toast.com/)
- [TailwindCSS](https://tailwindcss.com/docs/responsive-design)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Morgan Logging](https://github.com/expressjs/morgan)
- [Express.js](https://expressjs.com/)
- [Passportjs](https://www.passportjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

## Troubleshooting ~ T I P S ~
- [ ] Refresh the page! 
- [ ] s l o w down your clicking
- [ ] If you do not logout on the Results page, you ARE still logged in. Remove your cookies manually! 
- [ ] Take a break, it's almost summer

## (In)visible Bugs to SPOT!  
- [ ] Improved Formik Validation 
- [ ] Selection Demarcation 
- [ ] Incomplete Page Refresh upon Logout 
- [ ] Double Logging

## Future Features 
- [x] Quiz History
- [ ] Abstract out environmental variables
- [ ] Multi-Quiz Platform
- [ ] Quiz Customization
- [ ] Buttons to Log Out
- [ ] Logged in Status
- [ ] Additional Quizzes
- [ ] User profile
- [ ] Filter Results
- [ ] OTP Registration
- [ ] Quiz Answers Explanation
- [ ] Spaced Repetition on Wrong Answers
- [ ] UI/UX: Prettfy the App
- [ ] Accessibility Customizations
