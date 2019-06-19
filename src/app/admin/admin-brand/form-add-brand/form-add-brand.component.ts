import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { AddBrand } from 'src/app/redux/Actions/admin.actions';
import { AppState } from 'src/app/redux/app.state';
import { FormControl, Validators } from '@angular/forms';
import { BrandServiceService } from 'src/app/shared/services/brand-service.service';

@Component({
  selector: 'app-form-add-brand',
  templateUrl: './form-add-brand.component.html',
  styleUrls: ['./form-add-brand.component.scss']
})
export class FormAddBrandComponent implements OnInit {
  brand = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  brands: Array<IBrand>;
  // brand: string;
  constructor(
    private store: Store<AppState>,
    private brandService: BrandServiceService
  ) { }

  ngOnInit() {
  }
  public addBrand(): void {
    const newBrand: IBrand = {
      name: this.brand.value,
    };
    this.brandService.addJsonBrand(newBrand).subscribe(() => {
      this.store.dispatch(new AddBrand(this.brand.value));
    });
    this.brand.reset();
  }
}
