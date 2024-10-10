import { CountCategoryIncidentsDto } from './count-category-incidents.dto';

export interface CategoryStatsDto {
  total: string;
  incidents: CountCategoryIncidentsDto[];
}
