import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { SEARCH_DEBOUNCE_TIME } from '../../../../../../libs/helpers';
import { PointsService } from '../../../../../../libs/services';
import { MarkSearchDto } from '../../../../../../libs/dto';
import { CommonModule } from '@angular/common';
import { SpinnerColorsEnum } from '../../../../../../libs/enums';
import { SpinnerComponent } from '../../../../../spinner/spinner.component';

@Component({
  selector: 'app-map-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class MapSearchComponent implements OnInit {
  form: FormGroup;
  searchMode = false;
  searchPending = false;
  spinnerColor = SpinnerColorsEnum.LIGHT;
  searchResults: MarkSearchDto[] = [];
  @Output() markSelected = new EventEmitter<MarkSearchDto>();

  constructor(
    private readonly pointsService: PointsService,
    private readonly elementRef: ElementRef
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
          if (value) {
            this.searchPending = true;
            return this.pointsService.search(value);
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
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.handleOutsideClick();
    }
  }

  handleOutsideClick(): void {
    if (this.searchMode) {
      this.searchMode = false;
      this.searchResults = [];
      this.form.get('search')?.setValue('');
    }
  }

  onSelectSearchedMark(mark: MarkSearchDto) {
    this.markSelected.emit({ ...mark });
    this.searchMode = false;
    this.searchResults = [];
    this.form.get('search')?.setValue('');
  }
}
