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
  singIn = false;
  ifRegistration = false;
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
    this.getUser();
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
    this.ifRegistration = false;
    this.singIn = !this.singIn;
    this.wrongPassword = false;
    this.registerForm.value.email = '';
  }
  public ifRegistrationTrue(): void {
    this.singIn = false;
    this.ifRegistration = !this.ifRegistration;
    this.wrongPassword = false;
    this.singInEmail = null;
    this.singInPassword = null;
  }
  public close(): void {
    this.singIn = false;
    this.ifRegistration = false;
    this.singInEmail = null;
    this.singInPassword = null;
    this.registerForm.reset();
    this.failEmail = false;
  }
  public showPassword(): void {
    const input = document.getElementsByTagName('input');
    if (input.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < input.length; i++) {
        if (input[i].type.toLowerCase() === 'password') {
          this.inputs.push(input[i]);
        }
      }
    }
    if (this.inputs[0].type === 'password') {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].type = 'text';
      }
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].type = 'password';
      }
    }

  }
  public newUser(): void {
    this.store.dispatch(new StartProccess());
    const existEmail = this.allUsers.some(user => user.email === this.registerForm.value.email);
    if (existEmail) {
      this.store.dispatch(new Failed(''));
      return alert('This email has already used');
    }
    this.ifRegistration = false;
    this.singIn = true;
    const newuUser: IUser = new User(this.registerForm.value);
    this.wrongPassword = false;
    this.registerForm.reset();
    this.userSevice.addUser(newuUser).subscribe(() => {
        this.getUser();
        this.store.dispatch(new SingUp());
      });
  }
  public getUser(): void {
    this.userSevice.getUser().subscribe(
      data => {
        this.allUsers = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public checkUser(): void {
    this.store.dispatch(new StartProccess());
    const existEmail = this.allUsers.some(user => user.email === this.singInEmail);
    if (!existEmail) {
      this.failEmail = true;
    } else {
      this.failEmail = false;
    }
    this.store.select('registerPage').subscribe( d => console.log(d.loading));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.singInEmail === this.allUsers[i].email && this.singInPassword === this.allUsers[i].password) {
        this.onLogin = true;
        this.failEmail = false;
        this.singIn = false;
        this.store.dispatch(new SingIn(this.allUsers[i]));
        this.singInEmail = null;
        this.singInPassword = null;
        this.wrongPassword = false;
        this.failEmail = false;
      } else {
        this.store.dispatch(new Failed({error: 'your data is wrong'}));
        this.wrongPassword = true;
      }
    }
  }
  public hideErrorWrongPassword(): boolean {
    const { errors, controls } = this.registerForm;
    if (controls.passwordRepeat.untouched) {
      return true;
    }
    return !(errors && errors.mismatchedPasswords);
  }
}
