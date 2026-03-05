import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { SeedService } from './seed.service';

@Module({
    imports: [
        UserModule,
        ConfigModule
    ],
    providers: [SeedService],
})

export class SeedModule {}