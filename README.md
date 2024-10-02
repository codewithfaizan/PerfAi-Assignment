# PerfAi-Assignment
Waqf Property Task Tracker

## Project Overview

A simple application to help Waqf property managers track basic tasks
related to property management.

<i>Tags - </i> #node #express #monogdb #react

## 

## Installation

Clone the repository from GitHub repo <a href="https://github.com/codewithfaizan/PerfAi-Assignment"> PerfAi-Assignment </a>. <b> Note : This Application requires a .env file containing mongodb srv string follow below </b>

```bash
git clone git@github.com:codewithfaizan/PerfAi-Assignment.git
```
Install the dependencies
```bash
// Same in client & server
npm i 
```
Create a .env file
```bash
touch .env
```
Copy paste the script inside the .env file and Add the mongoDB srv string

```bash
// .env
PORT = 3000
MONGODB_SRV=
```
<p>code for generating secret-key - </p>
## Development
### server
```bash
Start the server
```bash
nodemon app.js
```
### client
```bash
Start the server
```bash
npm run dev
```


## Features
### Authentication
- Session-based authentication is a stateful authentication technique where we use sessions to keep track of the authenticated user.
- User submits the login request for authentication.
- Server validates the credentials. If the credentials are valid, the server initiates a session and stores some information about the client
- Client saves the session id in a cookie and this cookie is sent to the server in each request made after the authentication.
- Server, upon receiving a request, checks if the session id is present in the request and uses this session id to get information about the client.

### Rate limiting
- Rate limiting and slow-down mechanisms help maintain the stability, security, and performance of web applications.
- These controls prevent overloading systems and offer a level of protection against brute force and Distributed Denial of Service (DDoS) attacks.
- express-rate-limit package is used to help handle high traffic.


## API Endpoints 
<h4>Public</h4>

<ul> 
<li>POST /api/auth/signup: create a new user account.</li>
<li>POST /api/auth/login: log in to an existing user account and receive an access token.</li>
</ul>
<h4>Notes  Endpoints</h4>
<ul>
<li>GET /api/notes: get a list of all notes for the authenticated user.</li>
<li>GET /api/notes/:id: get a note by ID for the authenticated user.</li>
<li>POST /api/notes: create a new note for the authenticated user.</li>
<li>PUT /api/notes/:id: update an existing note by ID for the authenticated user.</li>
<li>DELETE /api/notes/:id: delete a note by ID for the authenticated user.</li>
<li>POST /api/notes/:id/share: share a note with another user for the authenticated user.</li>
<li>GET /api/search?q=:query: search for notes based on keywords for the authenticated user.</li>
</ul>

## Npm packages used and their usage
- "bcrypt": "^5.1.1" --to securely hash the password
- "compression": "^1.7.4" --to enables gzip compression for the HTTP responses sent by the server, to reduce the size of the data transferred over the network for faster response
- "cors": "^2.8.5" --to enable Cross-Origin Resource Sharing (CORS)
- "dotenv": "^16.3.1" --to load environment variables from a .env file 
- "express": "^4.18.2" --to create an express application
- "express-rate-limit": "^7.1.5" --to implement rate limiting for endpoints
- "express-validator": "^7.0.1" --to wrap the handler with middleware for body validations
- "mongoose": "^8.0.3" --to define schemas, models, and interact with MongoDB 
- "morgan": "^1.10.0" --to log HTTP requests and information about incoming requests,helps in debugging, monitoring, and analyzing the behavior of the application
- "nodemon": "^3.0.2" --it is a tool to automatically restart the application whenever there are any changes in the source code


## Questions
If you have any questions about my assessment submission, please contact me directly at <a mailto="realfaizan01@gmail.com"> realfaizan01@gmail.com</a>.
