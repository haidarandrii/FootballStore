import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormValidator } from 'src/app/store/shared/validator';
import { Store } from '@ngrx/store';
import { AppState } from 'untitled folder/src/app/redux/app.state';
import { CloseForms, SingInStatus } from 'src/app/redux/Actions/actions';
import { StartProccess, Failed, SingUp } from 'src/app/redux/Actions/register.action';
import { User } from 'src/app/shared/clases/user';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'untitled folder/src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
  inputs = [];
  allUsers = []
  constructor(
    private store: Store<AppState>,
    private userSerice: UserService
  ) { }

  ngOnInit() {
  }
  public hideErrorWrongPassword(): boolean {
    const { errors, controls } = this.registerForm;
    if (controls.passwordRepeat.untouched) {
      return true;
    }
    return !(errors && errors.mismatchedPasswords);
  }
  public close(): void {
    this.store.dispatch(new CloseForms());
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
    this.store.dispatch(new SingInStatus());
    const newuUser: IUser = new User(this.registerForm.value);
    this.registerForm.reset();
    this.userSerice.addUser(newuUser).subscribe(() => {
        // this.getUser();
        this.store.dispatch(new SingUp());
      });
  }
  public getUser(): void {
    this.userSerice.getUser().subscribe(
      data => {
        this.allUsers = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
