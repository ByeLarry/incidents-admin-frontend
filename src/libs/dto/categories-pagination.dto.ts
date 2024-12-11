import { CategoryDto } from '../../components/sidebar/categories/dto';

export interface CategoriesPaginationDto {
  categories: CategoryDto[];
  total: number;
  page: number;
  limit: number;
}
