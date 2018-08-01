import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShopPage} from "../shop/shop";
import {OrdersPage} from "../orders/orders";
import {NewsPage} from "../news/news";
import {ProfilePage} from "../profile/profile";
import {SuggestionPage} from "../suggestion/suggestion";
import {Storage} from "@ionic/storage";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  tab1Root = ShopPage;
  tab2Root =OrdersPage ;
  tab3Root =NewsPage;
  tab4Root =ProfilePage;
  tab5Root =SuggestionPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
