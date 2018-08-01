import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SystemServiceProvider} from "../../providers/system-service/system-service";

/**
 * Generated class for the SuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  User = {Message: '', DatetimeSent: new Date().toLocaleDateString(), Sender: '', Status: '0'};
  alertmessage = '';
  toastmeassage="";
  comments :any;
  showmessage = false;
  message = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public service:SystemServiceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.getUser();
  }
  ionViewDidEnter(){
    this.GetComents();
  }

  getUser() {
    console.log('GET USERS');
    return this.storage.get('username').then((value) => {
       console.log(value);
      this.User.Sender = value;

      return value;
    });
  }
  sendComment(){

    if(this.User.Message===''){
      this.toastmeassage= "Please enter your message ";
      this.presentToast();
    }else{
      this.sendMessage();

    }

  }


  sendMessage(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending .....',
    });
    this.alertmessage = "thank you for suggestion we will get back to you";
    this.showAlert();
    loader.present().then(() => {
      this.service.Comment( this.User.Message,this.User.DatetimeSent,this.User.Sender,this.User.Status)
        .subscribe(
          data => {



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




  GetComents(){

 this.getUser();
    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'loading .....',
    });
    loader.present().then(() => {
      this.service.FindComments( this.User.Sender)
        .subscribe(
          data => {

            console.log(data)

           if  ( data.length ===0){

            }else{
             this.comments = data;
            }

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
  presentToast() {
    console.log('ALERT');
    let toast = this.toastCtrl.create({
      message: this.toastmeassage,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
