FROM node:16.14 as builder
WORKDIR /app

# Install dev dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Build application
COPY tsconfig.json ./
COPY src ./src
RUN yarn build


FROM node:16.14 as runner
WORKDIR /app

# Installs prod dependencies

COPY package*.json ./
COPY yarn.lock ./
RUN npm_config_build_from_source=true yarn install --frozen-lockfile --production=true

# Copy compiled from builder

COPY --from=builder /app/dist ./dist

EXPOSE 1928
VOLUME ["/app/store"]

# Run application

CMD ["yarn", "deploy"]
