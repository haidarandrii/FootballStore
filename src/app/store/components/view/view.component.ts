import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { BasketServiceService } from 'src/app/shared/services/basket-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  viewProduct: IProduct;
  productId: number;
  basketProduct: Array<IProduct> = [];
  constructor(
    private viewService: ViewService,
    private basketService: BasketServiceService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducts();
    this.getBasketProduct();
  }
  public getProducts(): void {
    this.viewService.getJsonProduct(this.productId).subscribe(
      data => {
        this.viewProduct = data;
      }
    );
  }
  public getBasketProduct(): void {
    this.basketService.getBasketProduct().subscribe(
      data => {
        this.basketProduct = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public addToBasket(product: IProduct): void {
    this.basketService.addBasketProducts(product).subscribe(
      () => this.getBasketProduct(),
    );
  }
  public existInBasket(): boolean {
    if (!this.viewProduct) {
      return false;
    }
    return this.basketProduct.some(product => product.id === this.viewProduct.id);
  }
}
