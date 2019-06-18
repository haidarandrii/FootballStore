import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddBrandComponent } from './form-add-brand.component';

describe('FormAddCategoryComponent', () => {
  let component: FormAddBrandComponent;
  let fixture: ComponentFixture<FormAddBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
