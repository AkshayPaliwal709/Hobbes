import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  reg = {
    email:'',
    password1:'',
    password2:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private afauth: AngularFireAuth ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  displayAlert(alertTitle, alertSub){
    let theAlert = this.alertCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    theAlert.present();
  }

  registerAccount(){
    if(this.reg.password1 !=this.reg.password2){
      this.displayAlert('Password Issue','Password does not match, please try again');
      this.reg.password1 = '';
      this.reg.password2 = '';
    }
    else{
      this.afauth.auth.createUserWithEmailAndPassword(this.reg.email, this.reg.password1)
      .then(res => this.regSuccess(res))
      .catch(err => this.displayAlert('Error! ', err));
    }
  }

  regSuccess(result){
    this.displayAlert(result.email, 'Account created for this email address');
    this.afauth.auth.signInWithEmailAndPassword(this.reg.email, this.reg.password1)
    .then(res => this.navCtrl.push(HomePage))
    .catch(err => this.displayAlert('Error! ', err));
  }

}
