import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from '../models/user.model';

@Injectable()
export class AuthService {

  private $currentUser = new BehaviorSubject<FirebaseUserModel>(null);
  currenUser = this.$currentUser.asObservable();

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  doFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      // hacer lo mismo de acuerdo con los datos que envía FB
    }, err => {
      console.log(err);
    });
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      let p = res.user.providerData[0];
      let u = new FirebaseUserModel(p.photoURL, p.displayName, p.providerId, res.user.uid);
      this.$currentUser.next(u);
    }, err => {
      console.log(err);
    })
  }

  doLogout() {
    if (firebase.auth().currentUser) {
      this.afAuth.auth.signOut();
      this.$currentUser.next(null);
    }
  }

  getCurrentUser() {
    var user = firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        let p = user.providerData[0];
        let u = new FirebaseUserModel(p.photoURL, p.displayName, p.providerId, user.uid);
        this.$currentUser.next(u);
      }
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }


}
