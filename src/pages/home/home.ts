import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage, NavParams } from 'ionic-angular';
import { Score } from '../../models/score.interface';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  

  public tom = [];
  public loadedTom =[];
  public scoreList;

  constructor(
    public navCtrl: NavController,
    public firestoreProvider: FirestoreProvider,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private afStore : AngularFirestore
  ) {
    this.scoreList = [];
    this.tom = [];
    this.loadedTom =[];
  }

  ionViewWillEnter(): void{

    // caching probleem, momenteel gewoon in 
    // this.firestoreProvider.getScoreList().subscribe( (data)=>{      
    //   var teller=0;

    //   data.map(actions => {

    //     let theData = actions.payload.doc.data();
    //     let id = actions.payload.doc.id;
    //     console.log(theData);

    //     this.scoreList.push(theData);//hier bouw ik mijn eigen array op

    //     this.getSpelById(theData.gezelschapSpelId,teller);
    //     teller++;

    //   });
    // })
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data.email){
      this.toast.create({
        message: `Welkom op de score-app, ${data.email}`,
        duration: 3000
        }).present();
      }
    })

    this.firestoreProvider.getScoreList().subscribe( (data)=>{      
      var teller=0;

      data.map(actions => {

        let theData = actions.payload.doc.data();
        let id = actions.payload.doc.id;
        console.log(theData);

        this.scoreList.push(theData);//hier bouw ik mijn eigen array op

        this.getSpelById(theData.gezelschapSpelId,teller);
        teller++;

      });
    }) 
  }

  goToCreatePage():void {
    this.navCtrl.push('CreatePage');
  }
  goToSpelPage():void {
    this.navCtrl.push('SpelPage');
  }
  goToDetailPage(score:Score):void {
    this.navCtrl.push('DetailPage',{score:score});
  }  
  getSpelById(spelId:string,teller) {
   this.firestoreProvider.getSpelById(spelId).subscribe( (data)=>{
     this.tom.push({
       score:this.scoreList[teller],
       spel:JSON.parse(JSON.stringify(data[0])
      )});  
       this.loadedTom.push({
         score:this.scoreList[teller],
        spel:JSON.parse(JSON.stringify(data[0])
        )});      
   })
   //console.log(this.tom);
  }

  initializeItems():void {
    this.tom = this.loadedTom;
  }
  getItems(searchbar) {
    this.initializeItems();

    var q = searchbar.srcElement.value;

    if(!q){
      return
    }

    this.tom = this.tom.filter((v) => {
      if(v.Titel && q){
        if (v.Titel.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
  }
}
