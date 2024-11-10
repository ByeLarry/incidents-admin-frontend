import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UpdateCategoryModalComponent } from '../../../modals/update-category/update-category.components';
import { CategoryDto } from '../dto';
import { CategoryService } from '../../../../libs/services';
import { toObservable } from '@angular/core/rxjs-interop';
import { DeleteCategoryModalComponent } from '../../../modals/delete-category/delete-category.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../libs/helpers';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
    NgbTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  selectedCategory?: CategoryDto;
  form: FormGroup;
  searchResults: CategoryDto[] = [];
  searchMode = false;
  categories$ = toObservable(this.categoryService.categories);
  isDeleting = false;

  constructor(private readonly categoryService: CategoryService) {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        map((val) => val.trim()),
        switchMap((value) => {
          this.searchMode = !!value;
          if (value) return this.categoryService.search(value);
          else return of([]);
        })
      )
      .subscribe((data) => {
        this.searchResults = [...data];
      });
  }

  onChangeButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }

  onDeleteButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }
}
