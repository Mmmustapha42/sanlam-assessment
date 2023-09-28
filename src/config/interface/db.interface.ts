export interface IConnection {
    mysql: {
        host: string
        user: string
        password: string
        database: string,
        connectionLimit?: number
    },
}

export interface IORMMapper {
    typeorm: {
        type: string,
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
        synchronize: boolean,
        logging: boolean,
        entities: object,
        migrations: object,
        migrationsTableName: string
        subscribers: object,
    }
}