import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textboxc',
  templateUrl: './textboxc.component.html',
  standalone: false,
  styleUrl: './textboxc.component.css',
})
export class TextboxcComponent {
  @Input() labelText: string = '';
  @Input() control: FormControl = new FormControl('');
  @Input() error: boolean = false;
  @Input() type: string = 'text';
}
