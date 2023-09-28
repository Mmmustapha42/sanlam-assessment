
import { IConnection, IORMMapper } from "./interface/db.interface"
import * as dotenv from "dotenv"
import { Users } from "../entities/user.entity"

dotenv.config()

const defaultDB: string = process.env.DB_CONNECTION as string

const connection: IConnection = {
    mysql: {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
        connectionLimit: Number(process.env.DB_POOL_CONNECTION_LIMIT) as number
    },

}

const mapper: IORMMapper = {
    typeorm: {
        type: "mysql",
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT) as number,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
        synchronize: false, 
        logging: false,
        entities: [Users],
        migrations: [],
        migrationsTableName: "migration_table",
        subscribers: [],
    }
}


export default {
    connection,
    defaultDB,
    mapper,
}