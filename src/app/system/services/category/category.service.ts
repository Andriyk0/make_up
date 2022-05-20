import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryRequest } from '../../interfaces/category.interface';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private firestore: Firestore
  ) { }

  getAll(): Observable<any>{
    return collectionData(collection(this.firestore,'category' ),{idField: 'id'});
  }

  create(category:ICategoryRequest):  Promise<DocumentReference<any>> {
    return addDoc(collection(this.firestore,'category'),category);
  }

  update(category:ICategoryRequest, id:string): Promise<void>{
    return setDoc(doc(this.firestore,'category',id),category);
  }
  delete(id:string): Promise<void>{
    return deleteDoc(doc(this.firestore,'category',id));
  }

}
