import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCategoryModalComponent } from '../../../modals/update-category/update-category.components';
import { CategoryDto } from '../dto';
import { CategoryService } from '../../../../libs/services';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, UpdateCategoryModalComponent],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  categories$?: Observable<CategoryDto[]>;
  selectedCategory?: CategoryDto;

  constructor(private readonly categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categories$ = this.categoryService.findAll();
  }

  onChangeButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }
}
