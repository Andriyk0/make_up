import { Component, OnInit } from '@angular/core';
import { IProductResponse } from '../../system/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../system/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { docData,doc,Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../system/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ICallbackRequest } from '../../system/interfaces/callback.interface.ts';
import { CallbackService } from '../../system/services/callback/callback.service';
import { ProductService } from "../../system/services/product/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public Mouseon = false;
  public Callback = false;
  public showSignIn = false;
  public showForgotPassword = false;
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public loginForm!: FormGroup;
  public loginSubscription!: Subscription;
  public isUserLogin = false;
  public isAdminLogin = false;
  public callbackForm!: FormGroup;
  public showMenu = true;
  public searchText = '';
  public products: Array<IProductResponse>=[];
  public searchProd = true;


  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private authService: AuthService,
    private toatr: ToastrService,
    private callbackService: CallbackService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initLoginForm();
    this.getAuthRole();
    this.checkLoginStatus();
    this.initCallbackGroup();
    this.loadProducts();
  }


  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;

    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    } else {
      this.basket = [];
    }
    this.totalCount();
  }

  totalCount(): void {
    this.total = this.basket.length;
  }

  updateBasket(): void {
    this.orderService.changeBasket$.subscribe(() => {
      this.loadBasket();
    })
  }

  showMenuBar(): void {
    this.showMenu = false
  }

  closeMenuBar(): void {
    this.showMenu = true
  }

  on(): void {
    this.Mouseon = true;
  }

  off(): void {
    this.Mouseon = false;
  }

  showCallback(): void {
    this.Callback = true;
    this.showSignIn = false;
    this.showForgotPassword = false;
  }

  signIn(): void {
    this.showSignIn = true;
    this.Callback = false;
  }

  forgotPassword(): void {
    this.showSignIn = false;
    this.showForgotPassword = true;
  }

  closeSignIn(): void {
    this.showSignIn = false;
    this.showForgotPassword = false;
  }

  closeCallBack(): void {
    this.Callback = false;
    this.showSignIn = false;
    this.showForgotPassword = false
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  signInUser(): void {
    const {email, password} = this.loginForm.value;
    this.login(email, password).then(() => {
      this.toatr.success('User successfully login')
    }).catch(err => {
      this.toatr.error(err, 'User login false')
    })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      localStorage.setItem('users', JSON.stringify({...user, id: credential.user.uid}));
      if (user && user['role'] === 'ADMIN') {
        this.router.navigate(['/admin'])
      } else if (user && user['role'] === 'users') {
        this.router.navigate(['/profile'])
      }
      this.authService.curentUser$.next(true);
    })


  }

  getAuthRole(): void {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
      const user = JSON.parse(localStorage.getItem('users') as string);
      if (user && user.role === 'ADMIN') {
        this.isAdminLogin = true;
        this.isUserLogin = false;
        this.showSignIn = false;
      } else if (user && user.role === 'users') {
        this.isUserLogin = true;
        this.isAdminLogin = false;
        this.showSignIn = false;
      } else {
        this.isAdminLogin = false;
        this.isUserLogin = false;
      }
    } else {
      this.isAdminLogin = false;
      this.isUserLogin = false;
    }
  }

  checkLoginStatus(): void {
    this.authService.curentUser$.subscribe(() => {
      this.getAuthRole();
    })
  }

  logOut() {
    this.authService.logOut();
  }

  initCallbackGroup(): void {
    this.callbackForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  addCallback(): void {
    const callback: ICallbackRequest = {
      ...this.callbackForm.value,
    };
    this.callbackService.create(callback).then(() => {
      this.Callback = false;
      this.toatr.success('Ми вам перетелефонуємо!');
    })
  }

}
