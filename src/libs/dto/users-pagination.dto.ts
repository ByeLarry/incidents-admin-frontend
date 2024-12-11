import { UserDto } from './user.dto';

export interface UsersPaginationDto {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
}
