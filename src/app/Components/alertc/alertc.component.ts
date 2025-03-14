import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alertc',
  standalone: false,
  templateUrl: './alertc.component.html',
  styleUrl: './alertc.component.css',
})
export class AlertcComponent {
  @Input() alertText: string = '';
}
