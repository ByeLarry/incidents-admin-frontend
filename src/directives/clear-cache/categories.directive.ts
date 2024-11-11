import { Directive, HostListener } from '@angular/core';
import { CategoryService, ToastService } from '../../libs/services';

@Directive({ standalone: true, selector: '[appClearCacheCategories]' })
export class ClearCacheCategoriesDirective {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastService: ToastService
  ) {}

  @HostListener('click') onClick() {
    this.onClearCacheClick();
  }

  private onClearCacheClick() {
    this.categoryService.clearCache().subscribe({
      next: () => this.toastService.showToast('Успех', 'Кэш очищен'),
      error: () =>
        this.toastService.showToast('Ошибка', 'Не удалось очистить кэш'),
    });
  }
}
