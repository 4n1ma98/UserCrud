import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttonc',
  templateUrl: './buttonc.component.html',
  standalone: false,
  styleUrl: './buttonc.component.css',
})
export class ButtoncComponent {
  @Input() value: string = '';
}
