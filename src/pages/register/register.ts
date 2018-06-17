import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController
  ) {
  } 

  async register(user:User) {
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.navCtrl.push('LoginPage');
      this.toast.create({
        message: `Registreren succesvol, u kunt nu inloggen`,
        duration: 3000
        }).present();
    }
    catch(e) {
      this.toast.create({
        message: e,
        duration: 3000
    }).present();
  }
}
}
