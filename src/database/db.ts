import { MongoClient, Db as mongoDb, Collection } from "mongodb";
import { collections } from "../config/config";

interface IConfig {
  URI: string;
  name: string;
}

export class Db {
  private db_name?: string;
  private uri?: IConfig["URI"];
  private rootClient: MongoClient;
  public db!: mongoDb;
  public users!: Collection;
  public threads!: Collection;
  constructor(public config: IConfig) {
    this.db_name = config.name;
    this.uri = config.URI;
    this.rootClient = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<this> {
    return new Promise<this>((resolve, reject) => {
      this.rootClient.connect((err, client) => {
        if (err) return reject(`Failed to connect to database. Err: ${err}`);
        console.info(`Connected to databse: ${this.db_name}`);

        this.db = client.db(this.db_name);
        this.users = this.db.collection(collections.users);
        this.threads = this.db.collection(collections.threads);
        resolve(this);
      });
    });
  }
}

let database: Db;

function getDB(): Db {
  return database;
}

async function setupDB(config: IConfig): Promise<void> {
  database = new Db({ URI: config.URI, name: config.name });
  await database.connect();
}

export { setupDB, getDB };
