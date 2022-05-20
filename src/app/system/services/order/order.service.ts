import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/oredr.interface';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getDocs, query, QuerySnapshot, setDoc, where } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket$ = new Subject<boolean>();

  constructor(
    private firestore:Firestore
  ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'order' ),{idField: 'id'});
  }

  getAllByUserId(id: string): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, 'order'), where("order.path", "==", id)));
  }

  getOne(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, 'order', id));
  }

  create(order:IOrderRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'order'),order);
  }

  update(order:IOrderRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'order',id),order);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'order',id));
  }
}
