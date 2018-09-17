FROM node:8.11.4-jessie

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

CMD npm run dev
