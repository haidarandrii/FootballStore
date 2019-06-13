import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PublicComponent } from './public.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PublicComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PublicComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project'`, () => {
    const fixture = TestBed.createComponent(PublicComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('project');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PublicComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to project!');
  });
});
