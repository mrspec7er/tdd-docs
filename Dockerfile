FROM postgres:15.2-alpine as postgres
WORKDIR /db

FROM node:lts-alpine3.16 as fastify

COPY . /app/

WORKDIR /app

RUN npm install

RUN apk update && apk add bash

COPY request.d.ts node_modules/fastify/types

EXPOSE 3000