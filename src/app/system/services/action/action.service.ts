import { Injectable } from '@angular/core';
import { IActionRequest, IActionResponse } from '../../interfaces/action.interface';
import { Observable } from 'rxjs';
import {collection, collectionData, Firestore, addDoc, setDoc, doc, deleteDoc, getDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore'


@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private action: Array<IActionResponse> = [];

  constructor(
    private firestore: Firestore
  ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'action' ),{idField: 'id'});
  }

  getOne(id:string): Promise<DocumentSnapshot<any>>{
    return getDoc(doc(this.firestore,'action',id));
  }

  create(action:IActionRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'action'),action);
  }

  update(action:IActionRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'action',id),action);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'action',id));
  }


}

