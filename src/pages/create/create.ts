import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController,Loading, AlertController, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Spel } from '../../models/spel.interface';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  public spelList: Observable<Spel[]>;
  public createScoreForm: FormGroup; 

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreProvider: FirestoreProvider,
    formBuilder: FormBuilder
  ) {
    this.spelList = firestoreProvider.getSpelList().valueChanges();
    this.createScoreForm = formBuilder.group({
    Titel: ['', Validators.required],
    gezelschapSpelId: ['', Validators.required],
    omschrijving: ['', Validators.required],
    winnaar: ['', Validators.required],    
    score: [''],
    datum: ['', Validators.required] 
    })
  }
  createScore(): void {
    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  
    const Titel = this.createScoreForm.value.Titel;
    const gezelschapSpelId = this.createScoreForm.value.gezelschapSpelId;
    const omschrijving = this.createScoreForm.value.omschrijving;
    const winnaar = this.createScoreForm.value.winnaar;
    const score = this.createScoreForm.value.score;
    const datum = this.createScoreForm.value.datum;
    this.firestoreProvider
    .createScore(
      Titel,
      gezelschapSpelId, 
      omschrijving,
      winnaar, 
      score,
      datum)
    .then(
      () => {        
        
        loading.dismiss().then(() => {
          //this.navCtrl.pop();
        this.navCtrl.setRoot('HomePage');
        this.navCtrl.setRoot('HomePage')
        });
      },
      error => {
        loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          alert.present();
        });
      }
    );    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }
}
