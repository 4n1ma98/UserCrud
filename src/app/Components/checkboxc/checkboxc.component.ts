import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkboxc',
  standalone: false,
  templateUrl: './checkboxc.component.html',
  styleUrl: './checkboxc.component.css',
})
export class CheckboxcComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() labelText: string = '';
}
