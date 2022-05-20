import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../system/services/action/action.service';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from '../../system/interfaces/action.interface';


@Component({
  selector: 'app-actions-details',
  templateUrl: './actions-details.component.html',
  styleUrls: ['./actions-details.component.scss']
})
export class ActionsDetailsComponent implements OnInit {

  public currentAction !: IActionResponse;

  constructor(
    private actionService : ActionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserOneAction()
  }

  getUserOneAction():void{
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionService.getOne(id).then(doc=>{
      this.currentAction = { ...doc.data(), id: doc.id } as IActionResponse;
    })
  }
}
