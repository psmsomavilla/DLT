import {Injectable, OnModuleInit} from '@nestjs/common';
import {UserService} from "../users/user.service";
import {ConfigService} from "@nestjs/config";
import {UserRole} from "../users/entities/user.entity";
import * as bcrypt from 'bcrypt';
import * as process from "node:process";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {

  }

  async onModuleInit() {
    await this.Seed();
  }

  private async Seed() {
    const adminEmail = process.env.adminEmail;
    const adminPass = process.env.adminPass;
    const adminName = process.env.adminName;

    if (!adminEmail || !adminPass) return;

    const exists = await this.userService.findByEmail(adminEmail);

    if (!exists) {

      const hashedPass = await bcrypt.hash(adminPass, 10);

      await this.userService.createAdmin({
        mail: adminEmail,
        password: hashedPass,
        name: adminName,
        role: UserRole.admin,
        isValidated: true
      });
      console.log("admin creado");
    } else {
      console.log("admin ya existe.");
    }
  }

}
