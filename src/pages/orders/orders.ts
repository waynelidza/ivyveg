import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SystemServiceProvider} from "../../providers/system-service/system-service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage implements OnInit {
  cellphonenumber ='';
  alertmessage = '';
  myrequest :any;
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SystemServiceProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');


  }
  ngOnInit() {


    console.log('ionViewDidLoad OrdersPage');
  }
  ionViewDidEnter(){
    this.getUser();
    this.getname();
  }
  getallOrder(){


    let loader = this.loadingCtrl.create({
      content: 'loading.....',
    });
    loader.present().then(() => {
      this.service.getmyProducts(this.cellphonenumber)
        .subscribe(
          data => {

            console.log(JSON.stringify(data))


               if(data.length===0){
                this.alertmessage ="you have no orders yet ";
                 this.showAlert();
               }else{
                 this.myrequest = data;
               }






          },
          error => {
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
  getUser(){
    return this.storage.get('cellphonenumber').then((value) => {

      this.cellphonenumber = value;
      this.getallOrder();
      return value;
    });
  }
  getname(){
    return this.storage.get('username').then((value) => {

      this.username = value;
      return value;
    });
  }
  Report(ID){

    let loader = this.loadingCtrl.create({
      content: 'sending request.....',
    });
    this.alertmessage = "your request has be sent wait for the delivery";
    this.showAlert();
    loader.present().then(() => {
      this.service.Report(this.username)
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


}
