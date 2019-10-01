import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /**
   * alias to Swal.fire
   *
   */
  modal(options) {
    Swal.fire(options)
  }


}


