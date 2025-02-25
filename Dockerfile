# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:21 as build

WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps --maxsockets=5
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.25.3 as nginx
COPY --from=build /app/build/ /usr/share/nginx/html
# Copy the nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf