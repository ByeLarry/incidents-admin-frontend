import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from '../../toast/toast.component';
import {
  SearchEngineReindexService,
  ToastService,
} from '../../../libs/services';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-search-engine-reindex-dropdown',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './search-engine-reindex.component.html',
})
export class SearchEngineReindexComponent implements AfterViewInit {
  @ViewChild('toast') toastComponent!: ToastComponent;

  constructor(
    private readonly toastService: ToastService,
    private readonly searchEngine: SearchEngineReindexService
  ) {}

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  reindexUsers() {
    this.searchEngine.reindexUsers().subscribe({
      next: () =>
        this.toastService.showToast(
          'Успех',
          'Пользователи успешно реиндексированы'
        ),
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.NotFound)
          this.toastService.showToast(
            'Ошибка',
            'В базе данных нет пользователей'
          );
        else
          this.toastService.showToast(
            'Ошибка',
            'Не удалось реиндексировать пользователей'
          );
      },
    });
  }
  reindexIncidents() {
    this.searchEngine.reindexMarks().subscribe({
      next: () =>
        this.toastService.showToast(
          'Успех',
          'Происшествия успешно реиндексированы'
        ),
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.NotFound)
          this.toastService.showToast(
            'Ошибка',
            'В базе данных нет происшествий'
          );
        else
          this.toastService.showToast(
            'Ошибка',
            'Не удалось реиндексировать происшествия'
          );
      },
    });
  }
  reindexCategories() {
    this.searchEngine.reindexCategories().subscribe({
      next: () =>
        this.toastService.showToast(
          'Успех',
          'Категории успешно реиндексированы'
        ),
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.NotFound)
          this.toastService.showToast('Ошибка', 'В базе данных нет категорий');
        else
          this.toastService.showToast(
            'Ошибка',
            'Не удалось реиндексировать категории'
          );
      },
    });
  }
}
