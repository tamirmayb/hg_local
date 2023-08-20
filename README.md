![Intro Image](/img/challenge.png)

# Assignment

## Intro

Hello and welcome to the Kittl backend test assignment! 

Small backstory: We're building a web app for designing and editing images, logos, posters, and more. We assigned development of the backend server to an intern, who then suddenly decided to switch his profession and became a baker. This intern didn't leave us any documentation, but we've managed to figure some of it out by reading the code that was left behind. The goal of this challenge is to take the intern's code, fix it, add an extra feature, and come up with a production deployment strategy.

### Getting started

The server is written in JavaScript and runs on `node`, using `express.js`. So you'll need `node` with `npm` installed to run it.

### Endpoints

There are 2 public endpoints that we know about:

`/api/illustrations` - returns all the illustrations from the database and increases the `impressions` count for each element.

`/api/illustrations/:id` - increases the `uses` count for the illustration with the given `id`.

### Pages

There're 3 pages that we found:

`/login.html` - that's the admin login page. It has the login form and forget password form. After login it redirects to the dashboard page.

`/forgot.html` - this page is shown to people who try to recover the password.

`/dashbaord.html` - page with unfinished dashboard.

### Scripts

`npm install` - installs the dependencies

`npm start` - starts the server

`npm run dev` - starts the development server in watch mode

`npm run db:populate` - recreates the database with fake data (useful for testing)

## Tasks

### 1. Review the provided code and fix everything you think is bad with it.

You might have a strong urge to just rewrite the whole project, but **that's not the point of this assignment**.
Please try to keep the original structure and don't refactor code unless absolutely necessary.
The main point is to see how good you are at working with and reviewing the existing(and not the best) codebase.
Try to provide granular changes (e.g. commits) with comments and explanations on what and why you changed.
If you think that there is something that requires fixing and will take multiple hours of work to fix it - just write about the issue and how you would approach fixing it.

### 2. Fix `Cross-Origin Request Blocked` issue.

Our intern deployed the code to the server before he took off, and the `/api/illustrations` and `/api/illustrations/:id` endpoints seem to work from the browser, but not when we call them from the production web app. All we know is that we get `Cross-Origin Request Blocked` error. Can you fix it?

### 3. Is this code production ready? How can we make it production ready?

Although this code seems to work, we already have some issues with it. For example in our "production" deployment we have thousands of illustrations and it takes forever to get the response. Can you do something about it?

### 4. How to deploy this project?

Though our intern managed to deploy the code, we aren't exactly sure where the server is, or how to configure it. We'll have to move the final deployment to a server we control before we launch. Please provide a clear deployment strategy for the provider of your choice (it can be a VPS or some PaaS) and explain why you chose that approach over others.

## Notes

### DB

`sqlite` was chosen as an easy way to get a working database that doesn't require extra setup. For this assignment you don't need to use another database, but feel free to write what db is better suited for this project in your opinion.

### Email

The `sendEmail` function in `email.js` is a placeholder and doesn't need to be changed. For the purposes of this assignment you can assume it is secure and works as intended.

### Final solution
To submit your solution please open a pull request to the main branch and add any extra information(comments, future improvement ideas, deployment plan, etc.) to the description of the pull request.


# Good luck and have fun!