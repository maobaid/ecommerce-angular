import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#f8fafc',
    color: '#334155',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  constructor() {}

  success(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  error(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message,
      customClass: {
        popup: 'bg-red-300 text-white',
      },
    });
  }

  info(message: string) {
    this.Toast.fire({
      icon: 'info',
      title: message,
      customClass: {
        popup: 'bg-blue-300 text-white',
      },
    });
  }

  warning(message: string) {
    this.Toast.fire({
      icon: 'warning',
      title: message,
      customClass: {
        popup: 'bg-amber-300 text-white',
      },
    });
  }
}
