import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Change } from "../entity/Change";

export class UserController {

  private changeRepository = getRepository(Change);

  async save(request: Request, response: Response, next: NextFunction) {
    return this.changeRepository.save(request.body);
  }


}