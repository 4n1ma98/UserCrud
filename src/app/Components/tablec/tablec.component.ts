import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Services/service.service';

@Component({
  selector: 'app-tablec',
  standalone: false,
  templateUrl: './tablec.component.html',
  styleUrl: './tablec.component.css',
})
export class TablecComponent implements OnInit {
  usersList: any[] = [];

  constructor(private api: ServiceService) {}

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers(): void {
    this.api.ReadUser().subscribe({
      next: (users: any[]) => {
        this.usersList = users;
      },
      error: (error: any) => {
        console.error('Error retrieving users:', error);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
