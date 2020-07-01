import dotenv from 'dotenv';

dotenv.config();

export interface IServerConfigurations {
  port: number;
  jwtSecret: string;
  jwtExpiration: string;
}

export interface IDataConfiguration {
  connectionString: string;
}

const database: IDataConfiguration= {
  connectionString: process.env.MONGODB_URI,
}

const server: IServerConfigurations = {
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
}


export function getDatabaseConfig(): IDataConfiguration {
  return database;
}

export function getServerConfigs(): IServerConfigurations {
  return server;
}
