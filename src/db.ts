import { Collection, MongoClient } from "mongodb";

class DBClient {
  public notifications: Collection<Document>;
  public members: Collection<Document>;

  async connect() {
    try {
      const client = new MongoClient(`${process.env.MONGO_CONNECTION_STRING}`);

      await client.connect();

      const db = await client.db("telegram-bot");

      console.info("Connection with Mongo DB established");

      this.notifications = db.collection("notifications");
      this.members = db.collection("members");
    } catch (error) {
      console.error("Cannot establish connection with Mongo DB: ", error?.message || error);
    }
  }
}

export const Database = new DBClient();
