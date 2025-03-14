import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
