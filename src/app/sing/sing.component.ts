import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { CloseForms } from 'src/app/redux/Actions/actions';
import { UserService } from 'src/app/shared/services/user.service';
import { StartProccess, Failed, SingIn } from 'src/app/redux/Actions/register.action';

@Component({
  selector: 'app-sing',
  templateUrl: './sing.component.html',
  styleUrls: ['./sing.component.scss']
})
export class SingComponent implements OnInit {
  inputs = [];
  allUsers = [];
  singInEmail;
  singInPassword;
  failEmail = false;
  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
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
  public getUser(): void {
    this.userService.getUser().subscribe(
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
    } else {
      this.failEmail = false;
    }
    this.store.select('registerPage').subscribe( d => console.log(d.loading));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.singInEmail === this.allUsers[i].email && this.singInPassword === this.allUsers[i].password) {
        this.store.dispatch(new CloseForms());
        this.store.dispatch(new SingIn(this.allUsers[i]));
      } else {
        this.store.dispatch(new Failed({error: 'your data is wrong'}));
      }
    }
  }
}
