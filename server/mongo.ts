import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Message } from "./types/message";
import { MongoClient, Db, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@pazucluster.klrce.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "Snakker";
const collectionMessage = "Message";

let client: MongoClient; // Single client instance to connect to MongoDB

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
export async function sendMessage(message: Message) {
  const db: Db = await singleInstanceClient();
  const col = db.collection(collectionMessage);

  // Perform verifications?

  col.insertOne(message);
}
