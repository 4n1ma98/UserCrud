import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbarc',
  standalone: false,
  templateUrl: './navbarc.component.html',
  styleUrl: './navbarc.component.css',
})
export class NavbarcComponent {
  fullName: string =
    sessionStorage.getItem('firstName')!.split(' ')[0] +
    ' ' +
    sessionStorage.getItem('lastName')!.split(' ')[0];

  constructor(private router: Router) {}

  cerrarSesion(): void {
    Swal.fire({
      title: '¿Deseas continuar?',
      text: 'Si se confirma la acción se cerrará la sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
