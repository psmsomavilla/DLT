import {SetMetadata} from "@nestjs/common";

export const keyRoles = "roles";

export const Roles = (...roles: string[]) => SetMetadata(keyRoles,roles);