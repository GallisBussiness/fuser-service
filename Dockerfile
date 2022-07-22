FROM node

WORKDIR /app

COPY package.json .

RUN npm i -g @nestjs/cli

RUN npm install 

COPY . .

EXPOSE 80

RUN npm run build

CMD ["npm","run","start:prod"]