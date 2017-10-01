import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
//Import the Flashlight
import { Flashlight } from '@ionic-native/flashlight';
//Import About page
import {AboutPage} from '../pages/about/about';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAec1zK1pZRN2xDWSJKoMqCfqkntsMhrU",
    authDomain: "project-914ae.firebaseapp.com",
    databaseURL: "https://project-914ae.firebaseio.com",
    storageBucket: "project-914ae.appspot.com",
    messagingSenderId: "567487649532"
  };
  //firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    //Import Firebase
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Flashlight
  ]
})
export class AppModule {}
