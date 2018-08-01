import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SystemServiceProvider} from "../../providers/system-service/system-service";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  alertmessage = '';
  Messages = "";
  constructor(public navCtrl: NavController, public navParams: NavParams ,public service:SystemServiceProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getNews();
  }
  ionViewDidEnter(){
    this.getNews();
  }

 getNews(){

   let loader = this.loadingCtrl.create({
     content: 'loading.....',
   });

   loader.present().then(() => {
     this.service.getNews()
       .subscribe(
         data => {

        this.Messages = data;

         },
         error => {
           if(error.status===409){

           }
           if (error.status === 0) {
             this.alertmessage = "not internet connection or server is down";
             this.showAlert();
           }

         });
     loader.dismiss();
   });
 }

  showAlert() {

    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
