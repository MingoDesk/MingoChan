import { MongoClient, Db as mongoDb, Collection } from 'mongodb';
import { datbaseCollections } from '@config/config';

interface IConfig {
	uri: string;
	name: string;
}

export class Db {
	private readonly dbName: string;

	private readonly uri?: IConfig['uri'];

	private readonly rootClient: MongoClient;

	public db!: mongoDb;

	public users!: Collection;

	public tickets!: Collection;

	public settings!: Collection;

	public organisations!: Collection;

	public constructor(public config: IConfig) {
		this.dbName = config.name;
		this.uri = config.uri;
		this.rootClient = new MongoClient(this.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	public async connect(): Promise<this> {
		return new Promise<this>((resolve, reject) => {
			this.rootClient.connect((err, client) => {
				// eslint-disable-next-line
				if (err) return reject(err);
				// eslint-disable-next-line no-console
				console.info(`Connected to databse: ${this.dbName}`);

				this.db = client.db(this.dbName);
				this.users = this.db.collection(datbaseCollections.users);
				this.tickets = this.db.collection(datbaseCollections.tickets);
				this.settings = this.db.collection(datbaseCollections.settings);
				this.organisations = this.db.collection(datbaseCollections.settings);
				resolve(this);
			});
		});
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
