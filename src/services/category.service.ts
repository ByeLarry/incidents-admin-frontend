import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CategoryDto,
  CategoryStatsDto,
} from '../components/sidebar/categories/dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  findAll() {
    return this.http.get<CategoryDto[]>('/api/categories/categories');
  }

  getStats() {
    return this.http.get<CategoryStatsDto[]>('/api/categories/stats');
  }
}
