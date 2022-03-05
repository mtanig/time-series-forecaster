# for build
FROM node:14-slim as build-image

WORKDIR /app

COPY src src
COPY assets assets

ADD package.json .
ADD tsconfig.json .
ADD vite.config.ts .
ADD index.html .

RUN npm install
RUN npm run build


# for distribution
FROM nginx:latest

EXPOSE 80

ADD ./deploy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-image /app/dist /usr/share/nginx/html