// db.js
import mongodb from 'mongodb';
import conf from '../config/config.js';

function db_init(mongoUrl, dbName){
  try {
    const mongo = new mongodb.MongoClient(conf.MONGO_URI);
    console.log('Connected to db');
    return mongo.db(dbName);
  } catch (error) {
    console.log('Error in connection');
    process.exit(1)
  }
}

export const db = db_init(conf.MONGO_URI, conf.DB_NAME);


