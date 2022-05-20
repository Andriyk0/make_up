import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProductRequest } from '../../interfaces/product.interface';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, DocumentData, DocumentSnapshot, QuerySnapshot, getDocs, query, where, getDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public changeProducts$ = new Subject<boolean>();
  public searchProduct !: string;

  constructor(
    private firestore: Firestore

  ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'products' ),{idField: 'id'});
  }

  getAllByCategory(name: string): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(collection(this.firestore, 'products'), where("category.path", "==", name)));
  }

  getOne(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, 'products', id));
  }

  create(products:IProductRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'products'),products);
  }

  update(products:IProductRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'products',id),products);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'products',id));
  }

}
