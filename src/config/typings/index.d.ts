import * as express from "express"


interface IUser {
    id: string;
    password: string
}


declare global {
    namespace Express {
        interface Request {
            user:IUser
        }
    }
}
