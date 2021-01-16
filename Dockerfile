FROM node:14.15.4
WORKDIR /usr/src/app


COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src /usr/src/app/src
RUN ls -a

RUN yarn install
RUN yarn global add pm2 typescript
RUN yarn build


ARG PORT
EXPOSE ${PORT}

COPY . ./

VOLUME ["/usr/src/app/store"]

CMD [ "yarn", "deploy" ]