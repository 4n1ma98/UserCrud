import { Component, ViewChild } from '@angular/core';
import { TablecComponent } from '../tablec/tablec.component';

@Component({
  selector: 'app-mainc',
  templateUrl: './mainc.component.html',
  standalone: false,
  styleUrl: './mainc.component.css',
})
export class MaincComponent {
  @ViewChild('tablec') tablec!: TablecComponent;
  alertMessage: string = '';
  showAlert: boolean = false;

  emit(): void {
    this.tablec.GetUsers();
  }

  error(event: any): void {
    this.showAlert = true;
    this.alertMessage = event;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
