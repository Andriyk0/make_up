import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PresentService } from '../../system/services/present/present.service';
import { AddPresentComponent } from './add-present/add-present.component';

@Component({
  selector: 'app-admin-present',
  templateUrl: './admin-present.component.html',
  styleUrls: ['./admin-present.component.scss']
})
export class AdminPresentComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private presentService: PresentService
  ) { }

  ngOnInit(): void {
  }

  openPresentDialog() {
    this.dialog.open(AddPresentComponent).afterClosed().subscribe(result => {
      if (result && result.pres) {
        this.presentService.create(result.pres).then(() => {
          this.presentService.changePresent$.next(true);
          this.toastr.success('Present successfully created');
        });
      }
    });
  }
}
