FROM node

WORKDIR /app

COPY package.json .

RUN npm i -g @nestjs/cli

RUN npm install 

COPY . .

EXPOSE 1000

CMD ["npm","run","start:dev"]