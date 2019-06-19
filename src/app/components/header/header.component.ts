import { Component, OnInit, HostListener } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product';
import { IUser } from '../../shared/interfaces/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { SingInStatus, RegistrationStatus } from '../../redux/Actions/actions';
import { BasketServiceService } from '../../shared/services/basket-service.service';
import { NAME_OF_COMPANY } from '../../store/shared/const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameOfCompany = NAME_OF_COMPANY;
  count: number;
  myProducts: Array<IProduct> = [];
  trueMenuMedia = false;
  failEmail = false;
  loader = false;
  currentUser: IUser;
  constructor(
    private basketService: BasketServiceService,
    private store: Store<AppState>,
  ) {
    this.count = 0;
    this.store.select('registerPage').subscribe(data => {
        this.currentUser = data.currentUser;
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
    this.getBasketProducts();
  }
  public showMenu(): void {
    this.trueMenuMedia = !this.trueMenuMedia;
  }
  public getBasketProducts(): void {
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.myProducts = data;
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
