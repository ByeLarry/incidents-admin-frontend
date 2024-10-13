import { UserDto } from './user.dto';

export interface UserAndAccessTokenDto {
  user: UserDto;
  accessToken: string;
}
