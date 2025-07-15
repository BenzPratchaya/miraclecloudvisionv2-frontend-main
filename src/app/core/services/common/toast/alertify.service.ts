import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToasterPosition } from 'src/app/core/helpers/enums';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(
    private toasterService :ToastrService
  ) { }

  success(message:string) {
    this.toasterService.success(message,'Success!', );
  }

  info(message:string) {
    this.toasterService.info(message,'Information!');
  }

  warning(message:string) {
    this.toasterService.warning(message,'Warning!');
  }

  error(message:string) {
    this.toasterService.error(message,'Error!');
  }
}
