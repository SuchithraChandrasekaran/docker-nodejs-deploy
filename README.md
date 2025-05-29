# Secure Node.js Service Deployment with Docker and GitHub Actions

This project demonstrate a secure, dockerized Node.js API deployed automatically to an AWS EC2 instance using GitHub Actions, 
with all secrets managed via environment variables and GitHub Secrets

---

## Features

- Simple Node.js REST service
- `/` route returns "Hello, world!"
- `/secret` route protected with Basic Auth
-  Secrets managed via `.env` file
-  Dockerized for easy container-based deployment
-  GitHub Actions workflow for CI/CD to remote server

---

##  Steps to Setup and Deploy

### 1. Clone the Repository

```
git clone https://github.com/SuchithraChandrasekaran/docker-nodejs-deploy.git
cd docker-nodejs-deploy
```
### 2. Install Dependencies
    npm install

### 3. Create a .env File

Create a .env file in the root directory:

    USERNAME=<username>
    PASSWORD=<password>
    SECRET_MESSAGE=<Any secret message>

### Never commit your .env file

### 4. Run Locally

    npm start
    - Visit [http://localhost:3000/](http://localhost:3000/) for "Hello, world!"

    - Visit [http://localhost:3000/secret](http://localhost:3000/secret) and use Basic Auth credentials from `.env`

### 5. Build and Run with Docker

    docker build -t docker-nodejs-deploy .
   docker run --env-file .env -p 3000:3000 node-secret

### 6. Set Up Remote Server (AWS EC2)

- Install Docker
- Copy .env to /opt/node-secret/.env
- Ensure SSH access is configured
 
### 7. Configure GitHub Secrets

In the GitHub repo, go to Settings → Secrets and variables → Actions, and add:

    HOST – remote server IP
    USERNAME – SSH username
    PRIVATE_KEY – private SSH key (as a single-line string)
    GHCR_USERNAME – your GitHub username
    GHCR_TOKEN – a GitHub personal access token with write:packages scope

### 8. GitHub Actions Deployment
A GitHub Actions workflow in .github/workflows/deploy.yml will:

- Build and push the Docker image to GitHub Container Registry
- SSH into the server
- Pull and run the image using Docker
