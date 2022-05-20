import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../system/services/action/action.service';
import { IActionResponse } from '../../system/interfaces/action.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddActionComponent } from './add-action/add-action.component';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent implements OnInit {

  public adminActions: Array<IActionResponse> = [];
  public editStatus = false;

  constructor(
    private actionService: ActionService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAdminAction()
  }
  getAdminAction():void{
    this.actionService.getAll().subscribe(data=>{
      this.adminActions = data as IActionResponse[];
    })
  }

  deleteAdminAction(action: IActionResponse):void {
    this.actionService.delete(action.id).then(()=>{
      this.getAdminAction();
      this.toastr.success('Action successfully delete')
    }).catch(err => {
      this.toastr.error(err.message, 'Delete Action')
    });
  }

  editAdminAction(action: IActionResponse): void {
    this.dialog.open(AddActionComponent, {
      backdropClass: 'dialog-back',
      data: {
        action: action
      }
    }).afterClosed().subscribe(result => {
      if (result && result.action) {
        this.actionService.update(result.action, action.id).then(() => {
          this.getAdminAction();
          this.toastr.success('Action successfully updated');
        })
      }
    })
  }

  openDialog() {
    this.dialog.open(AddActionComponent).afterClosed().subscribe(rezult =>{
      if (rezult && rezult.action){
        this.actionService.create(rezult.action).then(()=>{
          this.getAdminAction();
          this.toastr.success('Category successfully create');
        })
      }
    });
  }

}
