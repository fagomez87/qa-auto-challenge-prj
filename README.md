# ASAPP - QA Automation Challenge

## How to Run Locally through Docker-Compose

- Build the Images for API and UI:
    `docker build ./src/api -t asapp-qa-challenge-api`
    `docker build ./src/ui -t asapp-qa-challenge-ui`
- Start them through Docker-Compose:
    `docker-compose up -d`
- Go to `localhost:3000` for UI
- Go to `localhost:5000/api/docs/` for API Documentation

(to stop running, run `docker-compose stop`)
