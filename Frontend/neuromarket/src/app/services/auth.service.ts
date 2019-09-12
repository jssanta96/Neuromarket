import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user.model";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://127.0.0.1:8000'

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public httpClient: HttpClient
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.saveUser('test12', 'tse5')
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
    console.log('is login '+ JSON.parse(localStorage.getItem('user')))
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
        this.SetUserData(result.user.email);
      }).catch((error) => {
        window.alert(error)
      })
  }

  getUserData() {
    if (this.userData) {
      console.log('si hay data')
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  /* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }

  public saveUser(email:string, name: string): Observable<any> {
    console.log('entra a save con' + email + name)
    return this.httpClient.post(`${this.apiURL}/usuarios/`,{
      nombre: name,
      correo: email,
    });
  }

  public getProductsFiltered(discount:boolean, state: boolean): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/filtrar`,{
      descuento: discount,
      estado: state,
    });
  }
}
