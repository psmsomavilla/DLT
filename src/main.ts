import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuracion de Swagger
  const config = new DocumentBuilder()
      .setTitle("TECHNICAL TEST DLTCAT")
      .setDescription("API DE TECHNICAL TEST DLTCAT")
      .setVersion("1.0")
      .addTag("auth")
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
  console.log("Documentación en : http://localhost:3000/api");
}
bootstrap();
