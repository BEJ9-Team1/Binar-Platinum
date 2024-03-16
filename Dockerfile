FROM node:latest-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --silent

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ] 