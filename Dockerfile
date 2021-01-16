FROM node:14.15.4
WORKDIR /usr/src/app


COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install
RUN yarn global add pm2 typescript
RUN tsc

ARG PORT
EXPOSE ${PORT}

COPY . .

VOLUME ["/usr/src/app/store"]

CMD [ "yarn", "deploy" ]