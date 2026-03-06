import {SetMetadata} from "@nestjs/common";
import {UserRole} from "../../users/entities/user.entity";

export const keyRoles = "roles";

export const Roles = (...roles: UserRole[]) => SetMetadata(keyRoles,roles);

// roles son etiquetas que ponemos en el controlador para mas adelante el rolesguard decida que hacer