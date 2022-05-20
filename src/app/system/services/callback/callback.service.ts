import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICallbackRequest } from '../../interfaces/callback.interface.ts';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  constructor(
    private firestore: Firestore
    ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'callback' ),{idField: 'id'});
  }

  create(callback:ICallbackRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'callback'),callback);
  }

  update(callback:ICallbackRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'callback',id),callback);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'callback',id));
  }


}
