import { Component, computed } from '@angular/core';
import { CategoryService } from '../../../libs/services';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../sidebar/categories/dto';

@Component({
  selector: 'app-filter-marks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-marks.component.html',
})
export class FilterMarksComponent {
  selectedCategories = this.categoriesService.filteredCategories;
  categories = this.categoriesService.categories;
  isAllCategoriesSelected = computed(() => (this.categories().length === this.selectedCategories().length));

  constructor(private readonly categoriesService: CategoryService) {
  }

  toggleCategory(pressedCategory: CategoryDto) {
    if (this.selectedCategories().includes(pressedCategory)) {
      this.categoriesService.filteredCategories.update((data) => {
        const index = data.indexOf(pressedCategory);
        const copy = [...data];
        copy.splice(index, 1);
        return [...copy];
      })
    } else {
      this.categoriesService.filteredCategories.update((data) => {
        data.push(pressedCategory);
        return [...data];
      })
    }
  }

  toggleAllCategoriesCheckBox(){
    if(this.isAllCategoriesSelected()){
      this.categoriesService.filteredCategories.set([]);
    } else {
      this.categoriesService.filteredCategories.set([...this.categories()]);
    }
  }
}
