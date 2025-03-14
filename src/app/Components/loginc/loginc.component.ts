import { Component } from '@angular/core';
import { ServiceService } from '../../Services/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginc',
  standalone: false,
  templateUrl: './loginc.component.html',
  styleUrl: './loginc.component.css',
})
export class LogincComponent {
  email: string = '';
  pass: string = '';

  constructor(private api: ServiceService, private router: Router) {}

  login(): void {
    const credentials = {
      email: this.email,
      pass: this.pass,
    };

    this.api.Login(credentials).subscribe({
      next: (response: any) => {
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!',
        });
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
