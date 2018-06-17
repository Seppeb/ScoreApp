import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Score } from '../../models/score.interface';
import { Spel } from '../../models/spel.interface';
import {AngularFireAuth } from 'angularfire2/auth'

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {


  userId: string;

  constructor(
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid
    })
  }

  createScore(
    Titel: string,
    gezelschapSpelId: string,
    omschrijving: string,
    winnaar: string,
    score:number,
    datum:Date
  ): Promise<void> {
    const id = this.firestore.createId();    
    
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
  getScoreList() {
    return this.firestore.collection(`scoreList`).snapshotChanges();
  }
  deleteScore(scoreId:string): Promise<void> {
    return this.firestore.doc(`scoreList/${scoreId}`).delete();
  }


  createSpel(
    naam: string,
    uitgeverij: string,
    omschrijving: string,    
    aantalSpeler:number,    
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`spelList/${id}`).set({
      id,
      naam,
      uitgeverij,
      omschrijving,
      aantalSpeler,      
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
    aantalSpeler:number
  ): Promise<void> {    
    return this.firestore.doc(`spelList/${id}`).update({
      id,
      naam,
      uitgeverij,
      omschrijving,
      aantalSpeler,      
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
    var spel   
    spel = this.firestore.doc(spelId).ref.get() 
   }   
}
