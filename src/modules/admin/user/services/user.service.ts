import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateUserDto, FilterUserDto, UpdatePasswordDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  getUsers(filterUserDto: FilterUserDto): Promise<UserEntity[]> {
    const { name, username,status } = filterUserDto;

    let newQuery: any = {}

    if (name) newQuery.name = name
    if (username) newQuery.username = username
    if (status) newQuery.status = status
    // logic for filter
    return this.userRepo.find({
      where: newQuery
    });
  }

  async getUser(id: string): Promise<UserEntity> {

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`);
    }
    return user;
  }

  async findUserById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  findUserByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }


  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepo.create({ ...createUserDto, password: hashPassword });
    await this.userRepo.save(user);
    delete user.password;
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`);
    }
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<UserEntity> {
    const { currentPassword, newPassword } = updatePasswordDto;

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`);
    }
    const valid = await this.validateUser(user, currentPassword);
    if (!valid) {
      throw new UnauthorizedException('Password is not valid');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    return this.userRepo.save(user);
  }

  async resetPassword(id: string, password: string): Promise<UserEntity> {
    const user = await this.getUser(id);

    user.password = await bcrypt.hash(password, 10);
    return this.userRepo.save(user);
  }


  async deleteUser(id: string): Promise<UserEntity> {

    const user = await this.userRepo.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User of id ${id} not found`);
    }
    return this.userRepo.remove(user);
  }

  validateUser(user: UserEntity, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }

}