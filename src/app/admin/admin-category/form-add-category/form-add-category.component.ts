import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { ProductService } from 'src/app/shared/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { AddCategory } from 'src/app/redux/Actions/admin.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-category',
  templateUrl: './form-add-category.component.html',
  styleUrls: ['./form-add-category.component.scss']
})
export class FormAddCategoryComponent implements OnInit {
  addCategoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }
  public addCategory(): void {
    const category: ICategory = {
      name: this.addCategoryForm.value.name,
      img: this.addCategoryForm.value.image
    };
    if (category.name === undefined || category.img === undefined) { } else {
      this.productService.addJsonCategory(category).subscribe(() => {
        this.store.dispatch(new AddCategory(category));
      });
    }
    this.addCategoryForm.reset();
  }
}
