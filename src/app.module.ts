import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/admin/User/User.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '101',
      database: 'bootcamp',
      synchronize: true,
    }),
    UserModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
