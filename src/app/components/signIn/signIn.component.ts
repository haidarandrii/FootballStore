import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { CloseForms } from 'src/app/redux/Actions/actions';
import { UserService } from 'src/app/shared/services/user.service';
import { StartProccess, Failed, SingIn } from 'src/app/redux/Actions/register.action';
import { IUser } from '../../shared/interfaces/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss']
})
export class SignInComponent implements OnInit {
  inputs = [];
  allUsers: IUser[] = [];
  singInEmail: string;
  singInPassword: string;
  failEmail = false;
  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getUser();
    this.getInputTypePasswords();
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
  public getUser(): void {
    this.userService.getUser().subscribe(
      data => {
        this.allUsers = data;
      }
    );
  }
  public checkUser(): void {
    this.store.dispatch(new StartProccess());
    this.failEmail = this.allUsers.every(user => user.email !== this.singInEmail);
    const currentUser = this.allUsers
      .find(user => user.email === this.singInEmail && user.password === this.singInPassword);
    if (currentUser) {
      this.store.dispatch(new SingIn(currentUser));
      this.store.dispatch(new CloseForms());
    } else {
      this.store.dispatch(new Failed({error: 'your data is wrong'}));
    }
  }
}
