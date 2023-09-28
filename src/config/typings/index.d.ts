import * as express from "express"


interface IUser {
    id: string;
}


declare global {
    namespace Express {
        interface Request {
            user:IUser
        }
    }
}
