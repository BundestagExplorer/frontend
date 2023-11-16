# frontend
Contains the implementation for frontend using react.

>**Table of Contents**
>  1. [Development](#development) </br>
>  2. [Deployment](#deployment) </br>


## Development

Run the frontend locally

### Prerequisites**:
- install Docker

### START/RUN
Run local (auto-updating) node in a docker container on localhost:8080:
`docker compose up`

## Deployment

Create a production build using node, that is deployed in an nginx container on localhost:8080

### Prerequisites**:
- install Docker

### START/RUN
Build and run image:
`docker compose -f docker-compose_prod.yml up --build `

NOTE: npm install might take some time, but only on first startup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
