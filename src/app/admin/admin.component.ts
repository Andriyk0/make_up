import { Component, OnInit } from '@angular/core';
import { AuthService } from '../system/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  logOut() {
    this.authService.logOut();
  }
}
