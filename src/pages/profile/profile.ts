import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile.interface';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {
  }
  
  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.firestore.doc(`profile/${auth.uid}`).set(this.profile)
      .then(()=> this.navCtrl.setRoot('HomePage'));
    })
  }

}
