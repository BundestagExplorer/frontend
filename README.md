# frontend
Contains the implementation for frontend using react.

>**Table of Contents**
>  1. [Development](#development) </br>
>  2. [Deployment](#deployment) </br>


## Development

### Prerequisites**:
- install Node

### START/RUN
Run local (auto-updating) node:
`npm start`

## Deployment

### Prerequisites**:
- install Node
- install Docker

### START/RUN
Build image:
`docker build -t frontend .`

Run on port 8080:
`docker run -p 8080:8080 frontend`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).