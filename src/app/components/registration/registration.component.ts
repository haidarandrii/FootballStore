import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormValidator } from 'src/app/store/shared/validator';
import { Store } from '@ngrx/store';
import { CloseForms, SingInStatus } from 'src/app/redux/Actions/actions';
import { StartProccess, Failed, SingUp } from 'src/app/redux/Actions/register.action';
import { User } from 'src/app/shared/clases/user';
import { IUser } from 'src/app/shared/interfaces/user';
import { AppState } from '../../redux/app.state';
import { UserService } from '../../shared/services/user.service';

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
  allUsers = [];
  constructor(
    private store: Store<AppState>,
    private userSerice: UserService
  ) { }

  ngOnInit() {
    this.getInputTypePasswords();
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
  public getInputTypePasswords(): void {
    this.inputs = Array.from(document.getElementsByTagName('input'));
    this.inputs = this.inputs.filter(input => input.type.toLowerCase() === 'password');
  }
  public showPassword(): void {
    if (this.inputs[0].type === 'password') {
      this.inputs.forEach(input => input.type = 'text');
    } else {
      this.inputs.forEach(input => input.type = 'password');
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
    const newUser: IUser = new User(this.registerForm.value);
    this.registerForm.reset();
    this.userSerice.addUser(newUser).subscribe(() => {
        this.store.dispatch(new SingUp());
      });
  }
  public getUser(): void {
    this.userSerice.getUser().subscribe(
      data => {
        this.allUsers = data;
      }
    );
  }
}
