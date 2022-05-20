import { Component, OnInit } from '@angular/core';
import emailMask from 'text-mask-addons/dist/emailMask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { doc,Firestore,setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public emailMask = emailMask;
  public createUserForm!: FormGroup;
  public currentUser:any;

  constructor(
    private fb:FormBuilder,
    private auth:Auth,
    private toast: ToastrService,
    private afs : Firestore,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm():void{
    this.createUserForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
      firstName:[null,[Validators.required]],
      secondName:[null,[Validators.required]],
      repeatPassword:[null,[Validators.required]],
      phone:[null,[Validators.required]],
      dateOfBirth:[null,[Validators.required]],
    })
  }

  createUser():void{
    if(this.createUserForm.value.password === this.createUserForm.value.repeatPassword){
      const {email,password} = this.createUserForm.value;
      this.emailSignUp(email,password).then(()=>{
        this.toast.success("User successfully create");
        this.router.navigate(['']);
        this.createUserForm.reset();
      }).catch(err =>{
        this.toast.error(err,'User login false')
      })
    }else {
      this.toast.error('Паролі не співпадають')
    }

  }

  async emailSignUp(email:string,password:string):Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth,email,password);
    const user = {
      email:credential.user.email,
      firstName: this.createUserForm.value.firstName,
      secondName:  this.createUserForm.value.secondName,
      dateOfBirth:this.createUserForm.value.dateOfBirth,
      phone:this.createUserForm.value.phone,
      orders:[],
      role:'users'
    }
      let data = await setDoc(doc(this.afs,"users",credential.user.uid),user);
      return data;
  }


}
