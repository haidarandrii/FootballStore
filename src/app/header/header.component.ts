import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/clases/user';
import { IUser } from '../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { SingUp, Failed, SingIn, StartProccess } from '../redux/Actions/register.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count: number;
  myProducts: Array<IProduct> = [];
  trueMenuMedia = false;
  singIn = false;
  ifRegistration = false;
  inputs = [];
  failEmail = false;
  // REGESTRATION
  loader = false;
  firstName: string;
  secondName: string;
  dateOfBirth: Date = new Date(2000, 1, 1);
  email: string;
  password: string;
  passwordRepeat: string;
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
    this.email = null;
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
    this.passwordRepeat = null;
    this.firstName = null;
    this.secondName = null;
    this.password = null;
    this.email = null;
    this.dateOfBirth = null;
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
    const existEmail = this.allUsers.some(user => user.email === this.email);
    if (existEmail) {
      return alert('This email has already used');
    }
    if (this.password === this.passwordRepeat) {
      this.firstName = this.firstName.toLowerCase();
      this.secondName = this.secondName.toLowerCase();

      this.ifRegistration = false;
      this.singIn = true;
      const user: IUser = new User(
      this.firstName,
      this.secondName,
      this.dateOfBirth,
      this.email,
      this.password);
      this.passwordRepeat = null;
      this.firstName = null;
      this.secondName = null;
      this.password = null;
      this.email = null;
      this.dateOfBirth = null;
      this.wrongPassword = false;
      this.userSevice.addUser(user).subscribe(() => {
        this.getUser();
        this.store.dispatch(new SingUp());
      });
    } else {
      this.wrongPassword = true;
      this.store.dispatch(new Failed({error: 'Your data is wrong'}));
      console.log(this.store);
    }
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
    }
    this.store.select('registerPage').subscribe( d => console.log(d.loading));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.singInEmail === this.allUsers[i].email && this.singInPassword === this.allUsers[i].password) {
        this.onLogin = true;
        this.singIn = false;
        this.currentUser = this.allUsers[i];
        // this.userSevice.currentUser = this.currentUser;
        this.store.dispatch(new SingIn(this.currentUser));
        this.store.select('registerPage').subscribe(d => console.log(d.currentUser));
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
}
