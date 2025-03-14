import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../../Services/service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
      next: (users: any[]) => {
        this.usersList = users;
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
    if (userId) {
      this.api.DeleteUser(userId).subscribe({
        next: (response: any) => {
          console.log('User deleted: ', response);
          this.userDeleted.emit();
        },
        error: (error: any) => {
          this.error.emit('Hubo un error en el consumo del servicio: ' + error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });
    } else {
      this.error.emit('Debe proporcionar un ID válido para eliminar.');
    }
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
          console.log('User updated: ', response);
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
