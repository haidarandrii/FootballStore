import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { IProduct } from '../shared/interfaces/product';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/clases/user';
import { IUser } from '../shared/interfaces/user';

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
  // REGESTRATION
  firstName: string;
  secondName: string;
  dateOfBirth;
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
    private userSevice: UserService) {
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
  }
  public ifRegistrationTrue(): void {
    this.singIn = false;
    this.ifRegistration = !this.ifRegistration;
    this.wrongPassword = false;
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
    let input = document.getElementsByTagName('input');
    if(input.length > 0) {
      for(let i = 0; i < input.length; i++) {
        if (input[i].type.toLowerCase() === 'password') {
          this.inputs.push(input[i]);
        }
      }
    }
    if(this.inputs[0].type === 'password') {
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].type = 'text';
      }
    } else {
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].type = 'password';
      }
    }
    
  }
  public newUser(): void {
    if (this.password === this.passwordRepeat){
      this.ifRegistration = false;
      this.singIn = true;
      let user: IUser = new User(
      this.firstName,
      this.secondName,
      this.dateOfBirth,
      this.email,
      this.password)
      this.passwordRepeat = null;
      this.firstName = null;
      this.secondName = null;
      this.password = null;
      this.email = null;
      this.dateOfBirth = null;
      this.wrongPassword = false;
      this.userSevice.addUser(user).subscribe(() => {
        this.getUser();
      });
    }
    else {
      this.wrongPassword = true;
    }
  }
  public getUser(): void {
    this.userSevice.getUser().subscribe(
      data => {
        this.allUsers = data;
        console.log(this.allUsers);
      },
      err => {
        console.log(err);
      }
    )
  }
  public checkUser(): void {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.singInEmail === this.allUsers[i].email && this.singInPassword === this.allUsers[i].password) {
        this.onLogin = true;
        this.singIn = false;
        this.currentUser = this.allUsers[i];
        this.userSevice.currentUser = this.currentUser;
        this.singInEmail = null;
        this.singInPassword = null;
        this.wrongPassword = false;
      } else {
        this.wrongPassword = true;
      }
    }
  }
}
