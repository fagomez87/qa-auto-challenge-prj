# ASAPP - QA Automation Challenge

## Pre-requisites

*Docker*

If you haven't used it before, [this quickstart guide](https://docs.docker.com/get-started/) should help.


## How to run

- Build the Images for API and UI:

    `docker build ./src/api -t asapp-qa-challenge-api`
    
    `docker build ./src/ui -t asapp-qa-challenge-ui`

- Start them through docker-compose:

    `docker-compose up -d`

- Browse to `localhost:3000` to access the challenge UI
- Browse to `localhost:5000/api/docs/` for the API spec

(to stop running, run `docker-compose stop`)
