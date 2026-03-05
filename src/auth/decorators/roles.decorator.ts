import {SetMetadata} from "@nestjs/common";

export const keyRoles = "roles";

export const Roles = (...roles: string[]) => SetMetadata(keyRoles,roles);

// roles son etiquetas que ponemos en el controlador para mas adelante el rolesguard decida que hacer