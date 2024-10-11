import { AuthProvidersEnum, RolesEnum } from '../enums';

export interface UserDto {
  id: string;
  name: string;
  email?: string;
  phone_number?: string;
  activated: boolean;
  isBlocked: boolean;
  roles: RolesEnum[];
  provider: AuthProvidersEnum;
}
