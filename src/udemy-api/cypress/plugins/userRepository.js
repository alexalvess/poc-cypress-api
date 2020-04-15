const { mongoDb } = require("./config.json");
const { MongoClient, ObjectID } = require("mongodb");

class UserRepository {
    constructor() {
        this.connect();
    }
    
    connect = async () => {
        const client = new MongoClient(mongoDb.connectionString);
        await client.connect();
        this.collection = client.db(mongoDb.database).collection("user");
    }

    insertNew = async (object) => {
        try {
            object._id = new ObjectID().toHexString();
            await this.collection.insertOne(object);
            return true;
        } catch (e) {
            return e;
        }
    }

    deleteAll = async () => {
        try {
            await this.collection.deleteMany({});
            return true;
        } catch (e) {
            return e;
        }
    }

    recoverIds = async () => {
        try {
            let registers = [];
            let cursor = this.collection.find();
            await cursor.forEach(item => {
                registers.push(item._id);
            });
            return registers;
        } catch (e) {
            return e;
        }
    }
}

module.exports = UserRepository;



