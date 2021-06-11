FROM node:14.15.4
WORKDIR /usr/src/app


COPY package*.json ./
COPY yarn.lock ./


RUN yarn install
#RUN yarn global add typescript
COPY src /usr/src/app/src
COPY tsconfig.json ./
RUN yarn build


EXPOSE 1928


COPY . ./


VOLUME ["/usr/src/app/store"]
RUN ls -a

CMD [ "yarn", "deploy" ]