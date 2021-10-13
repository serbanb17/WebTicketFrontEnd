FROM node:14.18.0-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
FROM nginx:1.21.3-alpine
COPY --from=build /usr/local/app/dist/WebTicket /usr/share/nginx/html
EXPOSE 80