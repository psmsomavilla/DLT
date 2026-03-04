import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
      .setTitle("TECHNICAL TEST DLTCAT")
      .setDescription("API DE TECHNICAL TEST DLTCAT")
      .setVersion("1.0")
      .build()


  const document = SwaggerModule.createDocument(app, config); //escaneo de todos los controllers
  SwaggerModule.setup("api", app, document); // creamos la página web


  app.useGlobalPipes(new ValidationPipe()); // valida lo que nos llega del dto

  await app.listen(3000);
  console.log("Swagger en : http://localhost:3000/api");
}
bootstrap();
