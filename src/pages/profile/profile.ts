import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";
import {SystemServiceProvider} from "../../providers/system-service/system-service";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cellphonenumber ='';
  alertmessage = '';
  User :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public service:SystemServiceProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public platform: Platform) {
  }

  ionViewDidLoad() {

    this.logOut();
  }

  ionViewDidEnter(){

  }
  logOut(){
    this.storage.clear();
    this.navCtrl.push(LoginPage);
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        navigator['app'].exitApp();
      });
    });


    console.log("here");
  }



}
