FROM node:14-alpine3.10

LABEL version="1.0"
LABEL description="Production Image for MERN Library API"

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start"]