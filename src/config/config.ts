interface ICollections {
  users: string;
  tickets: string;
}

const collections: ICollections = {
  users: "Users",
  tickets: "Tickets",
};

const envFilter: string[] = [
  "PORT",
  "MONGO_URI",
  "DB_NAME",
  "SESSION_SECRET",
  "NODE_ENV",
  "SID",
  "REDIS_URI",
  "CLIENTID",
  "ISSUERBASEURL",
  "SECRET",
  "BASEURL",
  "SESSION_LIFETIME",
];

export { collections, envFilter };
