import {SetMetadata} from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Це буде наш декоратор, прокидуємо туди ролі і отримуємо їх у role.guard файлі:
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);