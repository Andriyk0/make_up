import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../system/services/action/action.service';
import { IActionResponse } from '../../system/interfaces/action.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public userAction: Array<IActionResponse> = [];
  constructor(
    private ActionService : ActionService
  ) { }

  ngOnInit(): void {
    this.getUserAction();
  }

  getUserAction():void{
    this.ActionService.getAll().subscribe(data=>{
      this.userAction = data as IActionResponse[];;
    }, err=>{
      console.log("get all action",err)
    })
  }

}
