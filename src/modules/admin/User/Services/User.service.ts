import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../Entities/User.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<UserEntity>
  ) { }

  GetUsers(){
    return "Gets all users"
  }
}