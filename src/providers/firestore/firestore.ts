import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Score } from '../../models/score.interface';
import { Spel } from '../../models/spel.interface';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {

  constructor(public firestore: AngularFirestore) {}

  createScore(
    Titel: string,
    gezelschapSpelId: string,
    omschrijving: string,
    winnaar: string,
    score:number,
    datum:Date
  ): Promise<void> {
    const id = this.firestore.createId();
    // var data = {
    //   id: id,
    //   Titel: Titel,
    //   gezelschapSpelId: gezelschapSpelId,
    //   datum:datum,
    //   winnaar:winnaar,
    //   score:score,
    //   omschrijving:omschrijving
    // };
    
    return this.firestore.doc(`scoreList/${id}`).set({         
      Titel,
      omschrijving,
      gezelschapSpelId,
      id,
      datum,
      score,
      winnaar           
    });
  };
  getScoreList()/*: AngularFirestoreCollection<Score>*/ {
    return this.firestore.collection(`scoreList`).snapshotChanges();
  }
  deleteScore(scoreId:string): Promise<void> {
    return this.firestore.doc(`scoreList/${scoreId}`).delete();
  }


  createSpel(
    naam: string,
    uitgeverij: string,
    omschrijving: string,    
    aantalSpelers:number,    
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`spelList/${id}`).set({
      id,
      naam,
      uitgeverij,
      omschrijving,
      aantalSpelers,      
    });
  };

  getSpelList(): AngularFirestoreCollection<Spel> {
    return this.firestore.collection(`spelList`);
  }
  deleteSpel(spelId:string): Promise<void> {
    return this.firestore.doc(`spelList/${spelId}`).delete();
  }
  updateSpel(
    id:string,
    naam: string,
    uitgeverij: string,
    omschrijving: string,    
    aantalSpelers:number
  ): Promise<void> {    
    return this.firestore.doc(`spelList/${id}`).update({
      id,
      naam,
      uitgeverij,
      omschrijving,
      aantalSpelers,      
    });    
  }
   getSpelById(spelId:string) {     
     console.log(spelId)
   // return this.firestore.doc(spelId).ref.get();

   // return this.firestore.collection("spelList").valueChanges();
   //afs.collection('items', ref => ref.where('size', '==', 'large'))
   return this.firestore.collection("spelList", ref => ref.where("id","==",spelId)).valueChanges();
   }


  getSpelNaamById(spelId:string) {
    var spel;
    spel = this.firestore.doc(spelId).ref.get() 
   }   
}
