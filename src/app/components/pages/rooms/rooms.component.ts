import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  rooms: any[] = [];
  paginatedRooms: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor() {
    
    for (let i = 1; i <= 30; i++) {
      this.rooms.push({
        id: i,
        category: i % 2 === 0 ? 'Suite' : 'King size',
        description: i % 2 === 0 ? 'Habitación suite con alberca privada' : 'Habitación suite terraza privada',
        price: i % 2 === 0 ? '$500' : '$800',
        image: '../../../../assets/room' + (i % 3 + 1) + '.jpg'
      });
    }

    this.totalPages = Math.ceil(this.rooms.length / this.itemsPerPage);
    this.updatePaginatedRooms();
  }

  updatePaginatedRooms(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRooms = this.rooms.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRooms();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRooms();
    }
  }
}
