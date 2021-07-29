FROM node:14.15.5-alpine

WORKDIR /api

COPY package*.json ./

RUN npm i

COPY . .
