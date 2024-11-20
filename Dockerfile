FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["node", "server.js"]