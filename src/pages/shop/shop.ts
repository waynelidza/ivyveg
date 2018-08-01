import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SystemServiceProvider} from "../../providers/system-service/system-service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  products: any;
  totalPrice :number;
  numberofProducts : number
  usersNumber: any;
  priceperItem:number;
  alertmessage = '';
  toastmeassage="";
  buynow = {Totalprice: '0', CustomerName:'wayne',cellphonenumbers:'',details:"",status:"0",DatetimeOrder:""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SystemServiceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
    this.getall();


  }
  ionViewDidEnter(){
    this.getall();
  }
  getall() {
    let loader = this.loadingCtrl.create({
      content: 'loading.....',
    });
    loader.present().then(() => {
    this.service.getProducts()
      .subscribe(
        data => {
          this.products = data






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
  shopNow(ID,name,des,price){
    console.log('HERE')
    this.priceperItem = parseInt(price);
    let prompt = this.alertCtrl.create({
      title: name,
      message: 'R' + price,
      inputs: [


        {
          name: 'price',
          type:'number',
          placeholder: 'how many you want to buy'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {


            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy Now',
          handler: data => {





                   if(data.price==""){
                     this.toastmeassage="please enter the number of items you want to buy"
                     this.presentToast();
                   }else{
                     this.buynow.details = data.price+""+""+""+name;

                     console.log(this.buynow.details);
                     this.numberofProducts = parseInt(data.price);
                     this.totalPrice = this.numberofProducts * this.priceperItem;

                     this.getUser();

                   }

            }




        }
      ]
    });
    prompt.present();
  }

  sendRequest(){

    this.service.shopNow( this.totalPrice,this.buynow.CustomerName,this.buynow.cellphonenumbers,this.buynow.details, this.buynow.status,this.buynow.DatetimeOrder=new Date().toLocaleDateString())

      .subscribe(
        data => {
          console.log(this.buynow.DatetimeOrder);
          if(!data){

          }else {
            this.sendMessage();
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

  }


  sendMessage(){


    this.presentToast();
    let loader = this.loadingCtrl.create({
      content: 'sending request.....',
    });
    this.alertmessage = "your request has be sent wait for the delivery";
    this.showAlert();
    loader.present().then(() => {
    this.service.sendmessageforDevilery()
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


  getUser(){
    console.log('GET USERS')
    return this.storage.get('cellphonenumber').then((value) => {

      this.buynow.cellphonenumbers = value;
      this.sendRequest();
      return value;
    });
  }
}
