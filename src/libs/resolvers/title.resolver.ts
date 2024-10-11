import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DEFAULT_PAGE_NAME } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class TitleResolver implements Resolve<void> {
  constructor(private titleService: Title) {}

  resolve(): void {
    this.titleService.setTitle(DEFAULT_PAGE_NAME);
  }
}
