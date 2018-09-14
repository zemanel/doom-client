FROM node:8.11.4-jessie

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run dev
