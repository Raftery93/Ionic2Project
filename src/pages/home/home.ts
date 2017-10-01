import { Component } from '@angular/core';

import {
  NavController, AlertController,
  ActionSheetController, Platform, Events
} from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AboutPage } from '../about/about';

import { Camera } from 'ionic-native';

//Recorder
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  media: MediaPlugin;

// Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
  ionViewDidEnter() {
    this.media = new MediaPlugin('../Library/NoCloud/recording.wav')
  }

//Object for holding the image
  public base64Image: string;

//create 'list' for firebase
  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    af: AngularFire, public actionSheetCtrl: ActionSheetController) {
      //add lyrics to firebase
    this.songs = af.database.list('/songs');
  }

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Lyrics',
      message: "Enter song lyrics:",
      inputs: [
        {
          name: 'title',
          placeholder: 'Lyrics'
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
          text: 'Save',
          handler: data => {
            //pushes lyrics to firebase
            this.songs.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }//addSong


  showOptions(songId, songTitle) {
    //Uses ActionSheetController to give options which calls different methods
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Lyrics',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        }, {
          text: 'Update Lyrics',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }//showOptions

  removeSong(songId: string) {
    //removes lyric from firebase
    this.songs.remove(songId);
  }//removeSong

  updateSong(songId, songTitle) {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Update these lyrics",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
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
          text: 'Save',
          handler: data => {
            //updates lyric in firebase
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }//updateSong

  // Method to navigate to the about page
  navigateToAboutPage() {
    this.navCtrl.push(AboutPage);
  }

//Opens camera
  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  //Start Recorder - 'media' is a cordova plugin, which contains multiple predefined methods
  startRecording() {
    try {
      this.media.startRecord();
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }


  stopRecording() {
    try {
      this.media.stopRecord();
    }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
  }

  startPlayback() {
    try {
      this.media.play();
    }
    catch (e) {
      this.showAlert('Could not play recording.');
    }
  }

  stopPlayback() {
    try {
      this.media.stop();
    }
    catch (e) {
      this.showAlert('Could not stop playing recording.');
    }
  }

//Error handling
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


}//HomePage


