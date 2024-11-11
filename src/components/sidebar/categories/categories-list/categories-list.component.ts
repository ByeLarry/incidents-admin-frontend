import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UpdateCategoryModalComponent } from '../../../modals/update-category/update-category.components';
import { CategoryDto } from '../dto';
import { CategoryService, ToastService } from '../../../../libs/services';
import { toObservable } from '@angular/core/rxjs-interop';
import { DeleteCategoryModalComponent } from '../../../modals/delete-category/delete-category.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../libs/helpers';
import { ToastComponent } from '../../../toast/toast.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
    NgbTooltipModule,
    ReactiveFormsModule,
    ToastComponent,
  ],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit, AfterViewInit {
  selectedCategory?: CategoryDto;
  @ViewChild('toast') toastComponent!: ToastComponent;
  form: FormGroup;
  searchResults: CategoryDto[] = [];
  searchMode = false;
  categories$ = toObservable(this.categoryService.categories);
  isDeleting = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastService: ToastService
  ) {
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

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  onChangeButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }

  onDeleteButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }
}
