import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Spel } from '../../models/spel.interface';

/**
 * Generated class for the SpeldetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speldetail',
  templateUrl: 'speldetail.html',
})
export class SpeldetailPage {
  
  public spel: Spel;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public firestoreProvider: FirestoreProvider,
     public alertCtrl: AlertController
    ) {
      this.spel = this.navParams.get('spel');
  }  

   updateSpel(spel){
    this.navCtrl.push('UpdatespelPage',{spel:spel})
  }

  // ionViewWillEnter() {
  //   this.spel = this.navParams.get('spel');
  // }

  // ionViewDidLoad() {
  //   this.spel = this.navParams.get('spel');
  // }

  deleteSpel(spelId:string, spelNaam:string):void{
    console.log(spelId, spelNaam)
    const alert: Alert = this.alertCtrl.create({
      message: `Bent u zeker dat u de score ${spelNaam} wilt verwijderen?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Clicked Cancel');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.firestoreProvider.deleteSpel(spelId).then(() => {
              this.navCtrl.pop();
            });
          },
        },
      ],
    });
    alert.present();
  }

}
