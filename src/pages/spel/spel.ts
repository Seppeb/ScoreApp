import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Spel  } from '../../models/spel.interface';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the SpelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spel',
  templateUrl: 'spel.html',
})
export class SpelPage {

  public spelList: Observable<Spel[]>;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public firestoreProvider: FirestoreProvider) {}

  ionViewDidLoad() {
    this.spelList = this.firestoreProvider.getSpelList().valueChanges();
  }
  goToCreateSpelPage():void {
    this.navCtrl.push('CreateSpelPage');
  }
  goToSpelDetailPage(spel:Spel):void {
    this.navCtrl.push('SpeldetailPage',{spel:spel});
  }

}
