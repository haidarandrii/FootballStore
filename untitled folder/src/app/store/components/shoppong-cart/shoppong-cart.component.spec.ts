import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppongCartComponent } from './shoppong-cart.component';

describe('ShoppongCartComponent', () => {
  let component: ShoppongCartComponent;
  let fixture: ComponentFixture<ShoppongCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppongCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppongCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
