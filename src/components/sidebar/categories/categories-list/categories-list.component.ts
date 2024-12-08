import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UpdateCategoryModalComponent } from '../../../modals/update-category/update-category.components';
import { CategoryDto } from '../dto';
import { CategoryService, ToastService } from '../../../../libs/services';
import { toObservable } from '@angular/core/rxjs-interop';
import { DeleteCategoryModalComponent } from '../../../modals/delete-category/delete-category.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, Subscription, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../libs/helpers';
import { ToastComponent } from '../../../toast/toast.component';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { SpinnerColorsEnum } from '../../../../libs/enums';

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
    SpinnerComponent,
  ],
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  selectedCategory?: CategoryDto;
  @ViewChild('toast') toastComponent!: ToastComponent;
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;
  searchResults: CategoryDto[] = [];
  searchMode = false;
  searchPending = false;
  spinnerColor = SpinnerColorsEnum.PRIMARY;
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
    const searchSubscription = this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(SEARCH_DEBOUNCE_TIME),
        map((val) => val.trim()),
        switchMap((value) => {
          this.searchMode = !!value;
          if (value) {
            this.searchPending = true;
            return this.categoryService.search(value);
          } else {
            this.searchPending = false;
            return of([]);
          }
        })
      )
      .subscribe((data) => {
        this.searchResults = [...data];
        this.searchPending = false;
      });

    const categoriesSubscription = this.categories$.subscribe(() => {
      this.form.setValue({
        search: this.form.get('search')?.value,
      });
    });

    this.subscriptions.add(searchSubscription);
    this.subscriptions.add(categoriesSubscription);
  }

  ngAfterViewInit(): void {
    this.toastService.registerToast(this.toastComponent);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onChangeButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }

  onDeleteButtonClick(category: CategoryDto) {
    this.selectedCategory = { ...category };
  }
}
