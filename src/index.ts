import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Application } from "express"
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from "cors"


class Usermanagement {

    public app: Application = express()
    private PORT: number = 3000

    constructor() {
        this.startServer()
    }

    private async startServer() {
        this.initializeController()
        await this.createDatabaseConnection()

        this.app.listen(this.PORT, () => console.log("This Application is running on ", this.PORT))
    }

    private initializeMiddleware() {
        this.app.use(bodyParser.json())
        this.app.use(cors())
    }

    private initializeController() {
        Routes.forEach(route => {
            (this.app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
    }

    private async createDatabaseConnection() {
        await createConnection()
    }
}

new Usermanagement()