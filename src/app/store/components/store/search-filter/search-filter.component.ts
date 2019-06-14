import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ValueInput } from 'src/app/redux/Actions/filterCategory.action';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  showSearch = false;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }
  public clickSearch(): void {
    this.showSearch = !this.showSearch;
  }
  public onFilter(value): void {
    this.store.dispatch(new ValueInput(value));
  }
}
