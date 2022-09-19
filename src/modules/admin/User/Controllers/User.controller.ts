import { Controller, Get } from "@nestjs/common";
import { UserService } from "../Services/User.service";

@Controller('users')
export class UserController{

  constructor(private readonly userService: UserService){}

  @Get('/')
  GetUser(){
    const users = this.userService.GetUsers();
    return{
      data: users
    }
  }

}