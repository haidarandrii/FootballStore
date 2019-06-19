import { Component } from '@angular/core';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { BrandServiceService } from 'src/app/shared/services/brand-service.service';

@Component({
  selector: 'app-table-brand',
  templateUrl: './table-brand.component.html',
  styleUrls: ['./table-brand.component.scss']
})
export class TableBrandComponent {
  brands: Array<IBrand>;
  brand: string;
  constructor(
    private brandService: BrandServiceService,
    private store: Store<AppState>
  ) {
    this.store.select('adminPage').subscribe(data => {
      this.brand = data.brand;
      this.getBrands();
    });
  }
  public getBrands(): void {
    this.brandService.getJsonBrands().subscribe(
      data => {
        this.brands = data;
      }
    );
  }
}
