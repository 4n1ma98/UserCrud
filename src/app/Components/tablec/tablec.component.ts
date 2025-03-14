import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../../Services/service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablec',
  standalone: false,
  templateUrl: './tablec.component.html',
  styleUrl: './tablec.component.css',
})
export class TablecComponent implements OnInit {
  usersList: any[] = [];
  user: any = {};
  updateForm: FormGroup;
  @Output() userUpdated = new EventEmitter<void>();
  @Output() userDeleted = new EventEmitter<void>();
  @Output() error = new EventEmitter<string>();

  constructor(private api: ServiceService, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      firstName: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(50)],
      ],
      lastName: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(50)],
      ],
      id: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(15)],
      ],
      email: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      active: [false],
    });
  }

  get firstNameControl(): FormControl {
    return this.updateForm.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.updateForm.get('lastName') as FormControl;
  }

  get idControl(): FormControl {
    return this.updateForm.get('id') as FormControl;
  }

  get emailControl(): FormControl {
    return this.updateForm.get('email') as FormControl;
  }

  get activeControl(): FormControl {
    return this.updateForm.get('active') as FormControl;
  }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers(): void {
    this.api.ReadUser().subscribe({
      next: (users: any) => {
        this.usersList = users.additionalData;
      },
      error: (error: any) => {
        console.error('Hubo un error en el consumo del servicio:', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  onDelete(userId: string): void {
    Swal.fire({
      title: '¿Deseas continuar?',
      text: 'Si se confirma la acción se eliminará el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DeleteUser(userId).subscribe({
          next: (response: any) => {
            this.userDeleted.emit();
          },
          error: (error: any) => {
            this.error.emit(
              'Hubo un error en el consumo del servicio: ' + error
            );
          },
          complete: () => {
            console.log('Request completed');
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const user = {
        id: this.updateForm.get('id')?.value,
        email: this.updateForm.value.email,
        active: this.updateForm.value.active,
      };

      this.api.UpdateUser(user).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: 'Actualización exitosa!',
            text: 'El usuario se actualizó correctamente!',
            icon: 'success',
          });

          this.userUpdated.emit();
        },
        error: (error: any) => {
          this.error.emit('Hubo un error en el consumo del servicio: ' + error);
        },
        complete: () => {
          console.log('Request completed');
          this.updateForm.reset({ active: false });
        },
      });
    } else {
      this.error.emit('No puede haber ningún campo invalido.');
    }
  }

  captureData(user: any): void {
    this.updateForm.patchValue(user);
  }
}
