FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package.json package-lock.json ./
COPY ./src ./
COPY ./views ./views

ENV NODE_ENV="production"

RUN npm ci

CMD ["node", "./server.js"]
