import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor(
    public authService: AuthService,
  ) { }

  tryGoogleLogin(){
    this.authService.GoogleAuth();
    this.authService.saveUser('test2', 'test')
  }

  logout(){
    this.authService.SignOut();
  }
}
