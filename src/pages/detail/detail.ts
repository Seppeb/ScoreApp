import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Score } from '../../models/score.interface';
import { FirestoreProvider } from'../../providers/firestore/firestore'


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public score:Score;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public firestoreProvider:FirestoreProvider
  ){
    this.score = this.navParams.get('score');
  }

  ionViewDidLoad() {
    console.log(this.score)
  }
  deleteScore(scoreId:string, scoreTitel:string):void{
    console.log(scoreId, scoreTitel)
    const alert: Alert = this.alertCtrl.create({
      message: `Bent u zeker dat u de score ${scoreTitel} wilt verwijderen?`,
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
            this.firestoreProvider.deleteScore(scoreId).then(() => {
              this.navCtrl.pop();
            });
          },
        },
      ],
    });
    alert.present();
  }
}