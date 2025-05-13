import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateRoomComponent } from './create-room/create-room.component';

import { MaterialModule } from '../../../modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { RoomListComponent } from "./room-list/room-list.component";

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MaterialModule, CreateRoomComponent, RoomListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm!: FormGroup;

  roles = ['Cliente', 'Administrador', 'Gerente', 'Recepcionista'];
  statuses = ['Activo', 'Inactivo'];

  userList = [
    { id: '1', name: 'Juan Perez', role: 'Gerente', status: 'Activo' },
    { id: '2', name: 'Pedro Jimenez', role: 'Recepcionista', status: 'Activo' },
    { id: '3', name: 'Ana Admin', role: 'Admin', status: 'Activo' },
    { id: '4', name: 'Ana Cliente', role: 'Cliente', status: 'Inactivo' },
  ];

  displayedColumns: string[] = ['id', 'name', 'role', 'status', 'actions'];

  currentUser: any;
  userRole: string = '';

  name = '';
  email = '';
  cellphone = '';

  constructor(
    private fb: FormBuilder, 
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user) {
      this.currentUser = user;
      this.userRole = user.role?.toLowerCase() || '';

      // 🔁 Aquí asignamos los valores reales
      this.name = user.name || '';
      this.email = user.email || '';
      this.cellphone = user.cellphone || '';
    }

    this.profileForm = this.fb.group({
      username: [this.name, Validators.required],
      role: [this.userRole, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cellphone: [this.cellphone, Validators.required],
      status: ['Activo', Validators.required], // Por defecto activo
    });
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '75%',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuario actualizado:', result);
        const index = this.userList.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.userList[index] = {
            ...this.userList[index],
            name: result.username,
            role: result.role,
            status: result.status
          };
        }
      }
    });
  }

  deleteUser(id: string) {
    this.userList = this.userList.filter(user => user.id !== id);
  }
}
