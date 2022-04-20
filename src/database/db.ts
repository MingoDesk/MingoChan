import { MongoClient, Db as mongoDb, Collection, OptionalId } from 'mongodb';
import { datbaseCollections } from '@config/config';
import { logger } from '@util/logger';
import { User } from '@@types/user';
interface IConfig {
  uri: string;
  name: string;
}

export class Db {
  private readonly dbName: IConfig['name'];
  private readonly uri?: IConfig['uri'];
  private readonly rootClient: MongoClient;
  public db!: mongoDb;
  public users!: Collection<OptionalId<User>>;
  public tickets!: Collection;
  public settings!: Collection;
  public organisations!: Collection;
  public constructor(public config: IConfig) {
    this.dbName = config.name;
    this.uri = config.uri;
    this.rootClient = new MongoClient(this.uri);
  }

  public async connect(): Promise<this> {
    return new Promise<this>((resolve, reject) => {
      this.rootClient.connect((err, client) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (err || !client) return reject(err);
        logger.info(`Connected to databse: ${this.dbName}`);

        this.db = client.db(this.dbName);
        this.users = this.db.collection(datbaseCollections.users);
        this.tickets = this.db.collection(datbaseCollections.tickets);
        this.settings = this.db.collection(datbaseCollections.settings);
        resolve(this);
      });
    });
  }

  public async disconnect(): Promise<void> {
    await this.rootClient.close().catch(err => logger.error(err));
    logger.info('Disconected from DB');
  }
}

let database: Db;

export function getDB(): Db {
  return database;
}

export async function setupDB(config: IConfig): Promise<void> {
  database = new Db({ uri: config.uri, name: config.name });
  await database.connect();
}
