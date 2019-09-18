import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  userData: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.verifyLogin();
    this.initializeSideNav();
  }

  verifyLogin() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      this.getUserData();
    }
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('user'))
  }

  initializeSideNav(){
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {edge:'right'});
  }

  signOut(){
    this.authService.SignOut();
  }

}
