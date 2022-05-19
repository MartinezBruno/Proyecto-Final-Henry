FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package.json

RUN npm install --force

COPY . .

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
