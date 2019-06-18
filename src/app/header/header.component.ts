import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';
import { IUser } from '../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { FormValidator } from '../store/shared/validator';
import { SingInStatus, RegistrationStatus } from '../redux/Actions/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  registerForm = new FormGroup ({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    secondName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      FormValidator.matchingPasswords(this, 'registerForm'),
    ])
  });
  count = 0;
  myProducts: Array<IProduct> = [];
  trueMenuMedia = false;
  inputs = [];
  failEmail = false;
  // REGESTRATION
  loader = false;
  allUsers: Array<IUser>;
  wrongPassword = false;
  singInEmail: string;
  singInPassword: string;
  onLogin = false;
  currentUser: IUser;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>,
  ) {
    this.store.select('registerPage').subscribe(d => {
        this.currentUser = d.currentUser;
    });
    this.store.select('basketProductPage').subscribe(data => {
        this.count = data.basketProduct.length;
    });
  }
  public scroll: number;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scroll = window.scrollY;
  }

  ngOnInit() {
    this.getCounter();
    this.getBasketProducts();
  }
  public getCounter(): boolean {
    this.count = this.productService.countBasket;
    return true;
  }
  public showMenu(): void {
    this.trueMenuMedia = !this.trueMenuMedia;
  }
  public getBasketProducts(): void {
    this.productService.getBasketProduct().subscribe(
      data => {
        this.myProducts = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public singInTrue(): void {
    this.store.dispatch(new SingInStatus());
  }
  public ifRegistrationTrue(): void {
    this.store.dispatch(new RegistrationStatus());
  }
}
