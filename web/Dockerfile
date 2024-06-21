FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# RUN npm i -g serve

COPY . .

# RUN npm run build

EXPOSE 5173

# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]