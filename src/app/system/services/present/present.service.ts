import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPresentRequest } from '../../interfaces/presents.interface';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PresentService {

  public changePresent$ = new Subject<boolean>();

  constructor(
    private firestore: Firestore
    ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'present' ),{idField: 'id'});
  }

  getOne(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, 'present', id));
  }

  create(present:IPresentRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'present'),present);
  }

  update(present:IPresentRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'present',id),present);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'present',id));
  }
}
