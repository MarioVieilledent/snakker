import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Message } from "./types/message";
import { MongoClient, Db, ServerApiVersion, ObjectId } from "mongodb";
import { User } from "./types/user";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@pazucluster.klrce.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "Snakker";
const collectionMessage = "Message";
const collectionUser = "User";

let client: MongoClient; // Single client instance to connect to MongoDB
export let users: User[]; // Single instance of all users fetched at the start

// Singleton that returns the db connected
async function singleInstanceClient(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
  }
  return client.db(dbName);
}

// At the start of the server, get all users
export const gatherAllUsers = async (): Promise<any> => {
  try {
    const db: Db = await singleInstanceClient();
    const userList = await db.collection(collectionUser).find({}).toArray();
    users = userList as User[];
  } catch (e) {
    console.log(`Error fetching messages: ${e}`);
  }
};

// Get N last documents of a collection
export const getLastNDocuments = async (n: number): Promise<any> => {
  try {
    const db: Db = await singleInstanceClient();
    const docs = await db
      .collection(collectionMessage)
      .find()
      .sort({ _id: -1 })
      .limit(n + 1)
      .toArray();
    return docs;
  } catch (e) {
    console.log(`Error fetching messages: ${e}`);
  }
};

// Add a message
export const sendMessage = async (message: Message) => {
  const db: Db = await singleInstanceClient();
  const col = db.collection(collectionMessage);

  // Perform verifications?

  col.insertOne(message);
};
