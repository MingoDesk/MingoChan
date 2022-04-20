FROM node:16.14 as builder
WORKDIR /app

# Install dev dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Build application
COPY tsconfig.json ./
COPY src ./src
COPY tests ./tests
COPY jest.config.js ./jest.config.js
RUN yarn build

FROM builder as tester

CMD yarn test && yarn deploy

FROM node:16.14 as runner-dependencies
WORKDIR /app

# Installs prod dependencies

COPY package*.json ./
COPY yarn.lock ./
RUN npm_config_build_from_source=true yarn install --frozen-lockfile --production=true

# Copy compiled from builder

COPY --from=builder /app/dist ./dist

FROM runner-dependencies as runner
WORKDIR /app


EXPOSE 1928
VOLUME ["/app/store"]

# Run application

CMD ["yarn", "deploy"]
