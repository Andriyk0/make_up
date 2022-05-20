import { Component, OnInit } from '@angular/core';
import { ICallbackResponse } from '../../system/interfaces/callback.interface.ts';
import { CallbackService } from '../../system/services/callback/callback.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-callback',
  templateUrl: './admin-callback.component.html',
  styleUrls: ['./admin-callback.component.scss']
})
export class AdminCallbackComponent implements OnInit {

  callback: Array<ICallbackResponse> = [];

  constructor(
    private callbackService: CallbackService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadCallback()
  }

  loadCallback():void{
    this.callbackService.getAll().subscribe(data => {
      this.callback = data as ICallbackResponse[];
    })
  }

  deleteCallback(call: ICallbackResponse):void {
    this.callbackService.delete( call.id).then(()=>{
      this.loadCallback();
      this.toastr.success('Callback successfully delete');
    })
  }


}
