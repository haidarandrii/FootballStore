import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBrandComponent } from './table-brand.component';

describe('TableCategoryComponent', () => {
  let component: TableBrandComponent;
  let fixture: ComponentFixture<TableBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
