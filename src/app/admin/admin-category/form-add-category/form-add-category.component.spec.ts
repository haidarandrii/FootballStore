import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCategoryComponent } from './form-add-category.component';

describe('FormAddCategoryComponent', () => {
  let component: FormAddCategoryComponent;
  let fixture: ComponentFixture<FormAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
