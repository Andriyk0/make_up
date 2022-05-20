import { Component, OnInit } from '@angular/core';
import emailMask from 'text-mask-addons/dist/emailMask';
import { AuthService } from '../../system/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../system/services/order/order.service';
import { ProductService } from '../../system/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IOrderResponse } from "../../system/interfaces/oredr.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'imagePath', 'count'];
  public saveUserForm!: FormGroup;
  public emailMask = emailMask;
  public currentUser:any;
  public orderArray !: IOrderResponse[];
  public UserInfo = true;

  constructor(
    private orderService:OrderService,
    private productService:ProductService,
    private route:Router,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private fb:FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void{
    this.initUserForm();
    this.loadUser();
    this.loadOrders();
  }

  initUserForm():void{
    this.saveUserForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      firstName:[null,[Validators.required]],
      secondName:[null,[Validators.required]],
      phone:[null,[Validators.required]],
      dateOfBirth:[null,[Validators.required]],
      role:'users',
      order:this.orderArray
    })
  }

  logOut() {
    this.authService.logOut();
  }

  loadUser():void{
    if(localStorage.length>0 && localStorage.getItem('users')){
      this.currentUser = JSON.parse(localStorage.getItem('users') as string);
      const id = this.currentUser.id;
      this.authService.getUserInfo(this.currentUser.id).subscribe(users=>{
        this.currentUser = { ...users,id:id };
        this.updateUserForm();
      })
    }else{
      this.currentUser = null;
    }
  }

  updateUserForm():void{
    this.saveUserForm.patchValue({
      email:this.currentUser.email,
      firstName:this.currentUser.firstName,
      secondName:this.currentUser.secondName,
      phone:this.currentUser.phone,
      dateOfBirth:this.currentUser.dateOfBirth,
      role:this.currentUser.role,
    })
  }

  updateInfo():void {
    this.authService.updateUserInfo(this.saveUserForm.value,this.currentUser.id).then(()=>{
      this.loadUser();
      this.toastr.success('Ваші дані оновлено');
    })
  }


  loadOrders(): void {
    this.orderService.getAll().subscribe(data => {
      const order = data as IOrderResponse[];
      this.orderArray = order.filter(prod => prod.email === this.currentUser.email)
    })
  }

  ShowUserInfo():void{
    this.UserInfo = false;
  }
  closeUserInfo():void{
    this.UserInfo = true
  }
}
