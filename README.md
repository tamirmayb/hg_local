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

---

# Tamir's Solution:

### 1 - Code review

A few issues came up while reviewing the code:
* Critical
  * Missing default end point (`/`) is bad practice, so I added one.
  * Database connection should not be with the server's general code. I moved the creation part to a new file.
  * `/api/illustrations` ln. 72-74 - illustrations sent in the response are not updated as the fetching is done before the update, this is a bug.
  * In `login.html` there were 2 email fields with the same id, so I changed the second one to `emailForgot`.
  * let illustrations = [] it's bad practice to position it as a global variable, I moved it to the function using it.
  * The following code used twice in the original code :`res.status(404).send();`. 
    * This code actually breaks the flow of the system because the user cannot do anything after getting this error.
    * We should add a hidden field to `login.html` which should display the errors instead of using the 404 error.
* Not critical (worked well without my changes) but for good practice I've also changed the following:
  * It's a bit unusual to use both `""` and `'`, the common one in JS is `'` so I changed the code accordingly.
  * Usage of correct restapi CRUD endpoints was a bit messy, i.e. login ep was `GET` and should be `POST` etc. 
    * This was also reflected in the html part.
  * There were a few `console.log` calls which were removed, in the future a proper logging mechanism should be implemented.
  * I found a few times were keyword `let` was used instead of `const`.
  * Adding param values to the param in queries, so I think 
    * `const query = SELECT * FROM users WHERE email = '${email}'`
    * is better then 
    * `const query = 'SELECT * FROM users WHERE email = "' + email + '"';`

### 2 - Fix Cross-Origin Request Blocked issue.
Added missing usage of `cors` which should prevent the issue.

### 3 - Production readiness
* System worked well in local env. which has a few entries in each DB table, however, when trying to fetch from large tables the service would have taken a lot of time to complete datafetching.
  * As a solution a basic DB paginator mechanism was implemented for the big `illustrations` fetch by modifying the end point `/api/illustrations/:page?/:limit?` and adding the page number and limit the results during the sql query.
  * This should allow faster fetching.
  * If needed we should add the new paginator fields to the client (ui) as well.

### 4 Project deployment
* I would use `digitalocean.com` VPS (which is very robust, chip, and can be customized easley) for deploying the project directly from my Github where the repo of the project is located using the following steps:
  * Create Account for the company.
  * Create a managed database to be used by the project in this case MYSQL V8 should be fine.
  * Change the function `openDb` in `database.js` according to the database configuration.
  * Connect digitalocean to the company's Github service.
  * Set up the application by choosing the application's repository.
  * Click deploy and wait for build and deploy to complete.
  * Test the application in Production mode.
* Please note that for now the application is not deployed and the bullets above should be referred to as a suggestion. 
