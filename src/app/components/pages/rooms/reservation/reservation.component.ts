import { Component } from '@angular/core';

import { MaterialModule } from '../../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  arrivalDate: Date | null = null;
  departureDate: Date | null = null;
  guests: number | null = null;
  pricePerNight = 100;
}
