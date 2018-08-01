import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OrdersPage} from "../orders/orders";
import {ShopPage} from "../shop/shop";
import {NewsPage} from "../news/news";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root = ShopPage;
  tab2Root =OrdersPage ;
  tab3Root =NewsPage;
  constructor(public navCtrl: NavController) {

  }

}
