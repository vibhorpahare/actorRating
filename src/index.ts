import * as Server from './server';
import DBinit from './database/index'
import * as Configs from "./config";

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

// Define async start function
const start = async ({config,db}) => {
  try {
    const server = await Server.init(config);
    server.listen(config.port, () => {
      console.log(`App is running at http://localhost: ${config.port}`);
    });
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

//connect database
const dbConfig = Configs.getDatabaseConfig();
//initDatabase
const database = DBinit(dbConfig);

//get server config
const serverConfig = Configs.getServerConfigs();

start({config: serverConfig, db: database});