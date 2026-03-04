import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "../users/user.module";

@Module({
  imports: [
      UserModule,
      ConfigModule,
  ],

  providers: [SeedService],
})
export class SeedModule {}
