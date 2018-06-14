import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { AngularFireAuth} from 'angularfire2/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController
  ) {
  } 

  async login(user:User) {   
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      console.log(result);
      if(result) {
        this.navCtrl.setRoot('HomePage')      
    } 
  }
    catch(e){
      console.error(e);
      this.toast.create({
        message: `Verkeerde login gegevens, probeer opnieuw`,
        duration: 3000
      }).present();
    }
  }
  register() {
    this.navCtrl.push('RegisterPage');
  }
}
