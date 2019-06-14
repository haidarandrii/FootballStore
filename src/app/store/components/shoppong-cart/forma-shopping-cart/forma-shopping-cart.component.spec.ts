import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaShoppingCartComponent } from './forma-shopping-cart.component';

describe('FormaShoppingCartComponent', () => {
  let component: FormaShoppingCartComponent;
  let fixture: ComponentFixture<FormaShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormaShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
