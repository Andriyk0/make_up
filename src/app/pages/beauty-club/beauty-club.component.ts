import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beauty-club',
  templateUrl: './beauty-club.component.html',
  styleUrls: ['./beauty-club.component.scss']
})
export class BeautyClubComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigateByUrl("register")
  }


}
