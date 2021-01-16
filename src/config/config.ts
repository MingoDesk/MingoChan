interface ICollections {
  users: string;
  threads: string;
}

const collections: ICollections = {
  users: "Users",
  threads: "Threads",
};

const envFilter: string[] = ["PORT", "MONGO_URI", "DB_NAME", "SESSION_SECRET", "NODE_ENV", "SID", "REDIS_URI"];

export { collections, envFilter };
