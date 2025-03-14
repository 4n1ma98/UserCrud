import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-formc',
  standalone: false,
  templateUrl: './formc.component.html',
  styleUrl: './formc.component.css',
})
export class FormcComponent {
  registrationForm: FormGroup;
  @Output() userCreated = new EventEmitter<void>();
  @Output() error = new EventEmitter<string>();

  constructor(private api: ServiceService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      id: ['', [Validators.required, Validators.maxLength(15)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      pass: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  get firstNameControl(): FormControl {
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.registrationForm.get('lastName') as FormControl;
  }

  get idControl(): FormControl {
    return this.registrationForm.get('id') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get passControl(): FormControl {
    return this.registrationForm.get('pass') as FormControl;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        id: this.registrationForm.value.id,
        email: this.registrationForm.value.email,
        pass: this.registrationForm.value.pass,
      };

      this.api.CreateUser(user).subscribe({
        next: (response: any) => {
          console.log('User created: ', response);
          this.userCreated.emit();
        },
        error: (error: any) => {
          this.error.emit('Hubo un error en el consumo del servicio: ' + error);
        },
        complete: () => {
          console.log('Request completed');
          this.registrationForm.reset({ casado: false });
        },
      });
    } else {
      this.markAllAsTouched(this.registrationForm);
      this.error.emit('No puede haber ningún campo invalido.');
    }
  }

  markAllAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
