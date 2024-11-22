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

- Browse to `localhost:3000` to access the challenge UI.
- Browse to `localhost:5000/api/docs/` for the API spec.
- Command above will run the containers in background, but you can always follow logs with `docker-compose logs -f`.
- To stop containers you can run `docker-compose stop`.

Note that currently data such as users and stock will not persist after the containers are stopped.


## How to run Cypress tests
- If you want to run the tests in headless mode, you can use the following command:
`npm run cy:test`
- This will run the tests in headless mode
- If you want to run the tests in interactive mode, you can use the following command:
- First, you need to start the containers as described above
- Then, you can run the tests with the following command: `npx cypress open`
- Then, you can select the browser you want to use and run the tests.


## How to run API tests
- You can run the tests with the following command: `npm run api:test`
- This will create docker containers, run the tests using Jest and then stop the containers.