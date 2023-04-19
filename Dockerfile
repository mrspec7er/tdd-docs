FROM postgres:alpine as postgres

WORKDIR /usr/db

FROM node:18-alpine as fastify

RUN apk update && apk add bash

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

COPY request.d.ts node_modules/fastify/types

EXPOSE 3000

FROM nginx as nginx

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80