import Mongoose from 'mongoose';
import { IDataConfiguration } from "../config";

export default function (config: IDataConfiguration) {

    Mongoose.connect(process.env.MONGO_URL || config.connectionString,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    const db = Mongoose.connection;

    db.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    db.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });
}

