import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

//Boolean for flashlight
  isOn: boolean = false;

//Runs when the page has loaded. This event only happens once per page being created.
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private flashlight: Flashlight) {

  }



  // Return a boolean based on whether the flashlight is available for use
  async isAvailable(): Promise<boolean> {
    try {
      return await this.flashlight.available();
    }
    catch (e) {
      console.log(e);
    }
  }

  //
  // Toggles the flashlight between an on and off state. 
  //A variable is used to determine whether the flashlight is available.
  // If it is available:
  //  Toggle the flashlight
  //  Toggle the 'isOn' variable that updates our view color/icon.
  // If it isn't available:
  //  Log out to the console.

  async toggleFlash(): Promise<void> {
    try {
      let available = await this.isAvailable();
      if (available) {
        await this.flashlight.toggle();
        this.isOn = !this.isOn;
      }
      else {
        console.log("Not available.");
      }
    }
    catch (e) {
      console.log(e);
    }
  }


}
