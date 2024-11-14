import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineReindexService {
  constructor(private readonly http: HttpClient) {}

  reindexUsers() {
    return this.http.put('/api/auth/admin/reindex', {});
  }

  reindexCategories() {
    return this.http.put('/api/categories/admin/reindex', {});
  }

  reindexMarks() {
    return this.http.put('/api/marks/admin/reindex', {});
  }
}
