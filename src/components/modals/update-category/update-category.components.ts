import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryDto } from '../../sidebar/categories/dto';

@Component({
  selector: 'app-update-category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryModalComponent implements OnChanges {
  @Input() category!: CategoryDto;
  editableCategory!: CategoryDto;
  isButtonDisabled = true;

  ngOnChanges(): void {
    this.editableCategory = { ...this.category };
  }

  onInputChange() {
    this.isButtonDisabled =
      this.editableCategory.name === this.category.name &&
      this.editableCategory.color === this.category.color;
  }

  onSave() {
    this.category.name = this.editableCategory.name;
    this.category.color = this.editableCategory.color;
  }
}
