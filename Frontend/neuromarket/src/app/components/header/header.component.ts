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
    this.getUserData();
    this.initializeSideNav();
  }

  verifyLogin() {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn)
  }

  getUserData(){
    console.log('entra')
    this.userData = this.authService.getUserData();
    console.log(this.userData)
  }

  initializeSideNav(){
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {edge:'left'});
  }

}
