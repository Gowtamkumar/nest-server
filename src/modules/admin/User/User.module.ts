import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./Controllers/User.controller";
import { UserEntity } from "./Entities/User.entity";
import { UserService } from "./Services/User.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule { }