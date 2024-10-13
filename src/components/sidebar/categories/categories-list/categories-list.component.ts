import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UpdateCategoryModalComponent } from '../../../modals/update-category/update-category.components';
import { CategoryDto } from '../dto';
import { CategoryService } from '../../../../libs/services';
import { toObservable } from '@angular/core/rxjs-interop';
import { DeleteCategoryModalComponent } from '../../../modals/delete-category/delete-category.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
  ],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent {
  selectedCategory?: CategoryDto;
  categories$ = toObservable(this.categoryService.categories);
  isDeleting = false;

  constructor(private readonly categoryService: CategoryService) {}

  onChangeButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }

  onDeleteButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }
}
