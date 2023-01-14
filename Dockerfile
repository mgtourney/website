FROM node:lts-alpine

WORKDIR /app
COPY package*.json .

RUN npm install

COPY . . 

ENV NODE_ENV=PROD
ENV NEXT_PUBLIC_URL=http://localhost:3000
ENV NEXT_PUBLIC_NAME=Magnesium
ENV NEXT_PUBLIC_YEAR=2023
ENV NEXT_PUBLIC_VERSION=P1.0.0

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]