import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3900, ()=>{
    console.log("server connection successfully http://localhost:3900");
  });
}
bootstrap();
