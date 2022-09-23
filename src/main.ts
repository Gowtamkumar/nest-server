import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //we can whitelist the acceptable properties, and any property not included in the whitelist is automatically stripped from the resulting object. For example, if our handler expects email and password properties, but a request also includes an age property, this property can be automatically removed from the resulting DTO
      transform: true, //dto data transform to help 
      skipUndefinedProperties: true //If set to true then validator will skip validation of all properties that are undefined in the validating object.
    })
  )
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  
  await app.listen(3900, ()=>{
    console.log("server connection successfully http://localhost:3900");
  });
}
bootstrap();
