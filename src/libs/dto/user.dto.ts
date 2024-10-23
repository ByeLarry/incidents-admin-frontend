import { AuthProvidersEnum, RolesEnum } from '../enums';

export interface UserDto {
  id: string;
  name: string;
  surname: string;
  email?: string;
  phone_number?: string;
  activated: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: RolesEnum[];
  provider: AuthProvidersEnum;
  tokensCount?: number;
}
