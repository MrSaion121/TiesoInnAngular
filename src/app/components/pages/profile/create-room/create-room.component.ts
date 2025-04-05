import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-room-config',
  standalone: true,
  imports: [NavbarComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class RoomConfigComponent implements OnInit {
  roomForm!: FormGroup;
  categories = ['Estándar', 'Doble', 'Suite'];
  statuses = ['Disponible', 'Ocupada', 'Mantenimiento'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      category: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      console.log(this.roomForm.value);
    } else {
      this.roomForm.markAllAsTouched();
    }
  } 
}
