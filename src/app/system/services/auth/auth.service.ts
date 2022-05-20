import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Auth,signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public curentUser$ = new Subject<boolean>();

  constructor(
    private auth:Auth,
    private router:Router,
    private afs: Firestore,
    private toast: ToastrService
  ) { }

  logOut():void{
      localStorage.removeItem('users');
      signOut(this.auth).then(()=>{
      this.router.navigate(['']);
      this.curentUser$.next(false);
      this.toast.success('LogOut successfully')
    })
  }

  getUserInfo(id:string): Observable<DocumentData>{
    return docData(doc(this.afs,'users',id))
  }

  updateUserInfo(user:any,id:string): Promise<void>{
    return setDoc(doc(this.afs,'users',id),user)
  }


}
