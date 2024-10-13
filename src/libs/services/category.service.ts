import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import {
  CategoryDto,
  CategoryStatsDto,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto,
} from '../../components/sidebar/categories/dto';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = signal<CategoryDto[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadCategories();
  }

  private loadCategories() {
    this.findAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Ошибка при загрузке категорий: ', error);
      },
    });
  }

  getCategoriesLength() {
    return this.categories().length;
  }

  findAll() {
    return this.http.get<CategoryDto[]>('/api/categories/categories');
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
      .pipe(tap(() => this.loadCategories()));
  }

  delete(data: DeleteCategoryDto) {
    return this.http
      .delete(`/api/categories?id=${data.id}`, {
        withCredentials: true,
      })
      .pipe(tap(() => this.loadCategories()));
  }

  update(data: UpdateCategoryDto) {
    return this.http
      .patch('/api/categories', data, {
        withCredentials: true,
      })
      .pipe(tap(() => this.loadCategories()));
  }
}
