import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/clases/user';
import { IUser } from '../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { SingUp, Failed, SingIn, StartProccess } from '../redux/Actions/register.action';
import { FormValidator } from '../store/shared/validator';
import { SingInStatus, RegistrationStatus, CloseForms } from '../redux/Actions/actions';

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
  count: number;
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
    private userSevice: UserService,
    private store: Store<AppState>,
  ) {
    this.store.select('registerPage').subscribe(d => this.loader = d.loading);
    this.store.select('registerPage').subscribe(d => {
        this.currentUser = d.currentUser;
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
  @HostListener('click', ['$event.target'])
  onClick(btn) {
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
        console.log(this.registerForm);
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
