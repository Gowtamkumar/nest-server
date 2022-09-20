import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '101',
  database: 'arko',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
}