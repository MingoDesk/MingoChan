interface ICollections {
  users: string;
  threads: string;
}

const collections: ICollections = {
  users: "Users",
  threads: "Threads",
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
