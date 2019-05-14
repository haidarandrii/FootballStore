import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreInfoComponent } from 'src/app/store/components/store/storeinfo.component';

describe('StoreInfoComponent', () => {
  let component: StoreInfoComponent;
  let fixture: ComponentFixture<StoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
