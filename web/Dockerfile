# FROM node:alpine

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# # RUN npm i -g serve

# COPY . .

# # RUN npm run build

# EXPOSE 5000

# # CMD ["serve", "-s", "build"]
# CMD ["npm", "run", "dev"]




# FROM node:16-alpine AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build 

# FROM nginx:stable-alpine

# COPY --from=builder /app/dist /usr/share/nginx/html

# COPY ../nginx/nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:latest

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules
RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react
