import { UserDto } from "./user.dto";

export interface UsersViaPaginationDto {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
}
