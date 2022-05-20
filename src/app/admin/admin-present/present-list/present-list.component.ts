import { Component, OnInit } from '@angular/core';
import { IPresentResponse } from '../../../system/interfaces/presents.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PresentService } from '../../../system/services/present/present.service';
import { AddPresentComponent } from '../add-present/add-present.component';

@Component({
  selector: 'app-present-list',
  templateUrl: './present-list.component.html',
  styleUrls: ['./present-list.component.scss']
})
export class PresentListComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'path', 'description', 'sex', 'country', 'use' ,'price', 'image', 'actions'];
  public dataSource!: IPresentResponse[];
  public searchPresent!: string;

  constructor(
    private presentService: PresentService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPresent();
    this.checkChangePresent();
  }

  loadPresent(): void {
    this.presentService.getAll().subscribe(data => {
      this.dataSource = data as IPresentResponse[];
    })
  }

  checkChangePresent(): void {
    this.presentService.changePresent$.subscribe(() => {
      this.loadPresent()
    })
  }


  editPresent(present: IPresentResponse): void {
    this.dialog.open(AddPresentComponent, {
      backdropClass: 'dialog-back',
      data: {
        pres: present
      }
    }).afterClosed().subscribe(result => {
      if (result && result.pres) {
        this.presentService.update(result.pres, present.id).then(() => {
          this.loadPresent();
          this.toastr.success('Present successfully updated');
        })
      }
    })
  }

  deletePresent(present: IPresentResponse): void {
    this.presentService.delete(present.id).then(() => {
      this.loadPresent();
      this.toastr.success('Present successfully deleted');
    })
  }




}
