FROM node:21 as node

WORKDIR /app
COPY package*.json /app/
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
COPY ./ /app/

CMD ["npm", "start"]  