import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MaterialModule } from '../../../../../app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MaterialModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {

  // Hardcoded values

  roomList = [
    { id: '101', status: 'Listo' },
    { id: '102', status: 'Listo' },
    { id: '103', status: 'Pendiente' },
    { id: '104', status: 'Listo' },
    { id: '105', status: 'No disponible' },
  ];

  displayedColumns: string[] = ['id', 'status'];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Listo':
        return 'status-available';
      case 'Pendiente':
        return 'status-pending';
      case 'No disponible':
        return 'status-unavailable';
      default:
        return '';
    }
  }

}
