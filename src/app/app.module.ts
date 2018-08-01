import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FCM } from '@ionic-native/fcm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SystemServiceProvider } from '../providers/system-service/system-service';
import {LoginPageModule} from "../pages/login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {OrdersPageModule} from "../pages/orders/orders.module";
import {ShopPageModule} from "../pages/shop/shop.module";
import { Geolocation } from '@ionic-native/geolocation';
import {NewsPageModule} from "../pages/news/news.module";
import {IonicStorageModule} from "@ionic/storage";
import {MenuPageModule} from "../pages/menu/menu.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {SuggestionPageModule} from "../pages/suggestion/suggestion.module";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    OrdersPageModule,
    ShopPageModule,
    NewsPageModule,
    MenuPageModule,
    SuggestionPageModule,
    ProfilePageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArzxdnUyF8Njt3X0JEw2s1nUuh2_7Gr5s',
      libraries: ["places"]
    }),
    LoginPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    FCM,
    SplashScreen,

    Geolocation,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SystemServiceProvider
  ]
})
export class AppModule {}
