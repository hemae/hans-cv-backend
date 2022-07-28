FROM node:16.15.0

WORKDIR /hans-cv-backend

COPY package.json /hans-cv-backend

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]
