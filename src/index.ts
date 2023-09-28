import express, { Application } from "express";
//import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import { AppDataSource } from "./data-source";
import morgan from 'morgan'



AppDataSource.initialize().then(async () => {
    const app: Application = express();
   
    app.use(express.json());
    //app.use(helmet());
    app.use(morgan('dev'))
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(router)
    app.listen(3000, () => console.log("Now listening on port 3000"))

}).catch(error => console.log(error))
