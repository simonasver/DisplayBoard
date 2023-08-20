FROM node:20.5.0-alpine3.18 as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html