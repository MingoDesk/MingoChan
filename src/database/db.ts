import { MongoClient, Db as mongoDb, Collection } from 'mongodb';
import { datbaseCollections } from '../config/config';

interface IConfig {
	URI: string;
	name: string;
}

export class Db {
	private readonly db_name: string;
	private readonly uri?: IConfig['URI'];
	private readonly rootClient: MongoClient;
	public db!: mongoDb;
	public users!: Collection;
	public tickets!: Collection;
	public settings!: Collection;
	public constructor(public config: IConfig) {
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
				// eslint-disable-next-line
				if (err) return reject(err);
				console.info(`Connected to databse: ${this.db_name}`);

				this.db = client.db(this.db_name);
				this.users = this.db.collection(datbaseCollections.users);
				this.tickets = this.db.collection(datbaseCollections.tickets);
				this.settings = this.db.collection(datbaseCollections.settings);
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
