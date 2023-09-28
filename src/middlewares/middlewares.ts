
import { Users } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserMiddlewares {
    static async VerifyToken(req:Request, res:Response, next:NextFunction){
    
        const secretKey = process.env.SECRET_KEY as string
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }
        try {
        const decodedToken = jwt.verify(token, secretKey) as {id: string};
         req['user'] = decodedToken
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
    }
}