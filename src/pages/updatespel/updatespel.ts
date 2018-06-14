import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, Alert } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Spel } from '../../models/spel.interface';
import { identifierModuleUrl } from '@angular/compiler';

/**
 * Generated class for the UpdatespelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatespel',
  templateUrl: 'updatespel.html',
})
export class UpdatespelPage {

  public updateSpelForm: FormGroup;
  public spel: Spel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firestoreProvider: FirestoreProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder:FormBuilder
  
  ) {
    this.spel = this.navParams.get('spel');

    this.updateSpelForm = formBuilder.group({
      naam: [this.spel.naam, Validators.required],
      omschrijving: [this.spel.omschrijving, Validators.required],
      uitgeverij: [this.spel.uitgeverij, Validators.required],
      aantalSpelers: [this.spel.aantalSpeler, Validators.required]      
      })
  }
  updateSpel():void {
    const loading: Loading = this.loadingCtrl.create();
    loading.present();


    const id = this.spel.id;
    const naam = this.updateSpelForm.value.naam;
    const uitgeverij = this.updateSpelForm.value.uitgeverij;
    const omschrijving = this.updateSpelForm.value.omschrijving;
    const aantalSpelers = this.updateSpelForm.value.aantalSpelers;
    
    this.firestoreProvider.updateSpel(
      id,
      naam,
      uitgeverij,
      omschrijving,
      aantalSpelers
    ).then(() => {
      loading.dismiss().then(() => {
        this.navCtrl.pop();
      });
    },
    error => {
      loading.dismiss().then(() => {
        const alert : Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}],
        });
        alert.present();
      })
    }
    )
  }

}
