import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseUserModel } from 'src/app/models/user.model';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new FirebaseUserModel('', '', '', '');

  constructor(private auth: AuthService) {
    this.auth.currenUser.subscribe(val => {

      if (val) {
        this.user = val;
        console.log('val', this.user);
      }
    });
  }

  ngOnInit() {
    this.auth.getCurrentUser();
  }

}
