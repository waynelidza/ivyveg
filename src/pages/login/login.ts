import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import {SystemServiceProvider} from "../../providers/system-service/system-service";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {HomePage} from "../home/home";
import { Geolocation } from '@ionic-native/geolocation';
import {ListPage} from "../list/list";
import {} from '@types/googlemaps';
import { Storage } from '@ionic/storage';
import {MenuPage} from "../menu/menu";
import {MyApp} from "../../app/app.component";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Admin = {email: '', password: '',username:''};
  login= { password: '',cellphonenumber:''};
  map: any;
  errorcount=0;
  admin=0
  varcounterrorLogin =0;
  user;any;
  userGcmID;
  alertmessage = '';
  data :any
  Admins= {email: '', password: '', cellphonenumber: ''};
  User = { password: '', cellphonenumber: '',surname:'',address:'',name:"",accountStatus:"0"};
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('search') public searchElement: ElementRef;

  usersNumber:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public fcm: FCM, public Service: SystemServiceProvider,public alertCtrl: AlertController, private ngZone: NgZone,public loadingCtrl: LoadingController, public geolocation: Geolocation,private mapsAPILoader: MapsAPILoader, public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.registerGCM();

  }
registerGCM(){
  this.fcm.getToken().then(token => {

    this.userGcmID = token;

  });



  this.fcm.onNotification().subscribe( data => {
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      this.navCtrl.push('HomePage');
    }
  });
}

  letsRegister(){
    this.varcounterrorLogin =0;
    if(this.User.cellphonenumber===''){
      this.varcounterrorLogin++;

    }
    if(this.User.password===''){
      this.varcounterrorLogin++;

    }
    if(this.User.surname===''){
      this.varcounterrorLogin++;

    }
    if(this.User.address===''){
      this.varcounterrorLogin++;

    }
    if(this.User.name===''){
      this.varcounterrorLogin++;

    }
    if(this.varcounterrorLogin>0){
      this.alertmessage ="all fields must not be blank";
      this.showAlert();
    }
    else {

      let loader = this.loadingCtrl.create({
        content: 'loading.....',
      });
      loader.present().then(() => {
        this.Service.register(this.User.cellphonenumber,this.User.password, this.User.name, this.User.surname,  this.User.address, this.User.accountStatus = '0', this.userGcmID)
          .subscribe(
            data => {
              this.alertmessage = data.message;
              this.showAlert();
              this.notifyAdmin();

              // this.navCtrl.push(HomePage);


            },
            error => {
              if (error.status === 409) {
                this.alertmessage = "Phonenumber you have entered exist";
                this.showAlert();
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
  setMessage(statuscode:string){
    alert(statuscode);
//     switch(statuscode){
//       case "409":
//            this.alertmessage ="Phonenumber you have entered exist";
//     console.log('iniseide');
//             break;
//     }

    if(statuscode==='409'){
      alert('if');
      this.alertmessage ="Phonenumber you have entered exist";
      this.showAlert();
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }

notifyAdmin(){

    this.Service.sendmessagetoAdmin()
      .subscribe(
        data => {
          if(!data){
            this.showAlert();
          }else {

            // this.navCtrl.push(HomePage);
          }

        },
        error => {
          if(error.status===409){
            this.alertmessage ="";
            this.showAlert();
          }

        });
  }

  lestLogins() {
    this.varcounterrorLogin = 0;
    if (this.login.cellphonenumber === '') {
      this.varcounterrorLogin++;

    }
    if (this.login.password === '') {
      this.varcounterrorLogin++;

    }
    if (this.varcounterrorLogin>0) {
      this.alertmessage = " enter cellphonenumber and password";
      this.showAlert();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'please wait...',
      });

      loader.present().then(() => {
        this.Service.login(this.login.cellphonenumber, this.login.password)
          .subscribe(
            data => {
              if(data.accountStatus==='0'){
                this.alertmessage = " please wait for your account to be approved";
                this.showAlert();
                this.navCtrl.push(MyApp);

              }
              else {
                this.storage.clear();
                this.navCtrl.push(MenuPage);


              this.setTestParam(data.name);
                this.storage.set('userID', data._id);
                this.storage.set('cellphonenumber', data.cellphonenumber);
                this.storage.set('username', data.name);


              }
            },
            error => {
              if (error.status === 401) {

                this.alertmessage = " wrong cellphonenumber or password";
                this.showAlert();
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
loading() {
  let loader = this.loadingCtrl.create({
    content: 'Getting latest entries...',
  });

  loader.present().then(() => {
    this.Service.register(this.User.cellphonenumber,this.User.password, this.User.name, this.User.surname,  this.User.address, this.User.accountStatus = '0', this.userGcmID)
      .subscribe(
        data => {
          this.alertmessage = data.message;
          this.showAlert();
          this.notifyAdmin();

          // this.navCtrl.push(HomePage);


        },
        error => {
          if (error.status === 409) {
            this.alertmessage = "Phonenumber you have entered exist";
            this.showAlert();
          }

        });
    loader.dismiss();
  });

}


  setTestParam(testparam)
  {
    this.storage.set('test_param', testparam);

  }



}
