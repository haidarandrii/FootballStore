import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  currentUser: IUser;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  public getCurrentUser(): void {
    this.currentUser =  this.userService.currentUser;
  }
}
