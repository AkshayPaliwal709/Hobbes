import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage: any
  loggedIn: any
  constructor(public navCtrl: NavController,  private afauth: AngularFireAuth ) {
    this.loginPage = "LoginPage";

    this.afauth.auth.onAuthStateChanged( user=> {
      if(user){
        this.loggedIn = user.email;
      }
    })

  }

}
