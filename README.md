# frontend
Contains the implementation for frontend using react.

>**Table of Contents**
>  1. [Development](#development) </br>
>  2. [Deployment](#deployment) </br>


## Development

Run the frontend locally

### Prerequisites**:
- install Node

### START/RUN
Run local (auto-updating) node:
`npm start`

## Deployment

Create a docker image and run the image in a nginx container

### Prerequisites**:
- install Node
- install Docker

### START/RUN
Build image (NOTE: npm install might take some time):
`docker build -t frontend .`

Run on port 8080:
`docker run -p 8080:80 --name frontend frontend`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).