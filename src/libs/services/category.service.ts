import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import {
  CategoryDto,
  CategoryStatsDto,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto,
} from '../../components/sidebar/categories/dto';
import { tap } from 'rxjs';
import { CATEGORIES_PAGINATION_LIMIT } from '../helpers';
import { CategoriesSortEnum } from '../enums';
import { toObservable } from '@angular/core/rxjs-interop';
import { CategoriesPaginationDto } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = signal<CategoryDto[]>([]);
  paginatedCategories = signal<CategoryDto[]>([]);
  paginationData = signal<CategoriesPaginationDto | null>(null);
  filteredCategories = signal<CategoryDto[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadCategories();
    this.refetchPaginatedCategories();
  }

  private loadCategories() {
    this.getAllCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.filteredCategories.set(categories);
      },
    });
  }

  getCategoriesLength() {
    return this.categories().length;
  }

  inFilteredCategories(id?: number) {
    return computed(() => {
      return !!this.filteredCategories().find((category) => category.id === id);
    });
  }

  getAllCategories() {
    return this.http.get<CategoryDto[]>('/api/categories');
  }

  private getAllCategoriesWithPagination(
    page: number,
    limit: number,
    sort: string
  ) {
    return this.http.get<CategoriesPaginationDto>(
      `/api/categories/pagination?page=${page}&limit=${limit}&sort=${sort}`
    );
  }

  refetchPaginatedCategories(
    page = 1,
    limit = CATEGORIES_PAGINATION_LIMIT,
    sort = CategoriesSortEnum.CREATED_AT_ASC
  ) {
    this.getAllCategoriesWithPagination(page, limit, sort).subscribe((data) => {
      this.paginatedCategories.set(data.categories);
      this.paginationData.set(data);
    });
  }

  getPaginationDataAsObservable() {
    return toObservable(this.paginationData);
  }

  getCategoriesAsObservable() {
    return toObservable(this.categories);
  }

  getPaginatedCategoriesAsObservable() {
    return toObservable(this.paginatedCategories);
  }

  getStats() {
    return this.http.get<CategoryStatsDto>('/api/categories/stats', {
      withCredentials: true,
    });
  }

  create(data: CreateCategoryDto) {
    return this.http
      .post<CategoryDto>('/api/categories/create', data, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.loadCategories();
          this.refetchPaginatedCategories();
        })
      );
  }

  delete(data: DeleteCategoryDto) {
    return this.http
      .delete(`/api/categories?id=${data.id}`, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.loadCategories();
          this.refetchPaginatedCategories();
        })
      );
  }

  update(data: UpdateCategoryDto) {
    return this.http
      .patch('/api/categories', data, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.loadCategories();
          this.refetchPaginatedCategories();
        })
      );
  }

  search(query: string) {
    return this.http.get<CategoryDto[]>(
      `/api/categories/search?query=${query}`,
      {
        withCredentials: true,
      }
    );
  }

  clearCache() {
    return this.http.get('/api/categories/clear-cache', {
      withCredentials: true,
    });
  }
}
