import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreProvider } from '../../providers/firestore/firestore';

/**
 * Generated class for the CreateSpelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-spel',
  templateUrl: 'create-spel.html',
})
export class CreateSpelPage {

  public createSpelForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,    
    public alertCtrl: AlertController,
    public firestoreProvider:FirestoreProvider,
    formBuilder:FormBuilder
  ) {
    this.createSpelForm = formBuilder.group({
    naam: ['', Validators.required],
    omschrijving: ['', Validators.required],
    uitgeverij: ['', Validators.required],
    aantalSpelers: ['', Validators.required]      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSpelPage');
  }

  createSpel(): void {
    const loading: Loading = this.loadingCtrl.create();
    loading.present();
  
    const naam = this.createSpelForm.value.naam;
    const uitgeverij = this.createSpelForm.value.uitgeverij;
    const omschrijving = this.createSpelForm.value.omschrijving;
    const aantalSpelers = this.createSpelForm.value.aantalSpelers;    
    this.firestoreProvider.createSpel(
      naam,
      uitgeverij, 
      omschrijving, 
      aantalSpelers
    ).then(
      () => {
        loading.dismiss().then(() => {
          this.navCtrl.pop();
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
}
