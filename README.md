# Tech-Blog-A CMS-style Blog for Developers

 [link to website](https://sheltered-inlet-22919.herokuapp.com/)

 A CMS-style blog site for developers to publish articles, blog posts, and share their thoughts and opinions on various tech topics. The blog is built using the Model-View-Controller (MVC) paradigm, incorporating Handlebars.js for templating, Sequelize for ORM, and express-session for authentication.

 ### Screenshot 

 ![](./Assets/Screenshot%202023-04-15%20231630.png)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
 User authentication with secure password hashing
 Create, update, and delete blog posts
 Leave comments on other developers' posts
 Responsive design
 Installation
 Clone the repository:

## Installation
bash
git clone https://github.com/your-username/tech-blog.git
Install dependencies:

npm install
Set up a MySQL database and update the config/config.js file with your database credentials.

Create and seed the database by running the following commands:

npm run db:init
npm run db:seed
Start the server:

sql
npm start
Open a web browser and navigate to http://localhost:3001.

## Usage
- Visit the homepage to see existing blog posts.
- Click on "Dashboard" to sign up or log in to your account.
- After logging in, you can create, update, or delete your own blog posts.
- Leave comments on other developers' posts when logged in.
- Log out of your account when you're done.
 
 
## Contributing
Fork the repository.
Create a new branch with a descriptive name.
Commit your changes to the branch.
Create a pull request.
License
This project is licensed under the MIT License.