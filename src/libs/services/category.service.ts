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

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories = signal<CategoryDto[]>([]);
  filteredCategories = signal<CategoryDto[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadCategories();
  }

  private loadCategories() {
    this.findAll().subscribe({
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
    console.log(id)
    return computed(() => {
      return !!this.filteredCategories().find((category) => category.id === id);
    })
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

  search(query: string) {
    return this.http.get<CategoryDto[]>(`/api/categories/search?query=${query}`, {
      withCredentials: true,
    });
  }
}
