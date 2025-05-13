import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
import { MaterialModule } from '../../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [
    NavbarComponent, 
    MaterialModule, 
    ReactiveFormsModule, 
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent implements OnInit {
  roomForm!: FormGroup;
  categories = ['Estándar', 'Doble', 'Suite'];
  statuses = ['Disponible', 'Ocupada', 'Mantenimiento'];
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      category: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization token
    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.post(`${environment.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    }).subscribe({
      next: (event: any) => {
        if (event.type === 1) { // UploadProgress
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.body) {
          this.roomForm.patchValue({
            imageUrl: event.body.fileUrl
          });
          this.snackBar.open('Imagen subida correctamente', 'Cerrar', {
            duration: 3000
          });
          this.uploadProgress = 0;
        }
      },
      error: (err) => {
        console.error('Error al subir la imagen:', err);
        
        // More detailed error handling
        if (err.status === 401) {
          this.snackBar.open('No tienes autorización para subir archivos. Por favor inicia sesión nuevamente.', 'Cerrar', {
            duration: 5000
          });
        } else {
          this.snackBar.open('Error al subir la imagen', 'Cerrar', {
            duration: 5000
          });
        }
        
        this.uploadProgress = 0;
      }
    });
  }

  onSubmit(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      this.snackBar.open('Por favor complete todos los campos requeridos', 'Cerrar', {
        duration: 5000
      });
      return;
    }

    this.isSubmitting = true;
    
    // Preparar los datos de la habitación a enviar
    const roomData = {
      ...this.roomForm.value,
      pricePerNight: parseFloat(this.roomForm.value.pricePerNight)
    };

    // Enviar datos al endpoint de creación de habitaciones
    this.http.post(`${environment.apiUrl}/rooms`, roomData)
      .subscribe({
        next: (response: any) => {
          this.snackBar.open('Habitación creada con éxito', 'Cerrar', {
            duration: 3000
          });
          
          // Resetear el formulario
          this.resetForm();
          
          // Redirigir a la lista de habitaciones
          this.router.navigate(['/profile'], { fragment: 'rooms' });
        },
        error: (error) => {
          console.error('Error al crear habitación:', error);
          this.snackBar.open(
            error.error?.message || 'Ocurrió un error al crear la habitación. Intente nuevamente.',
            'Cerrar',
            { duration: 5000 }
          );
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
  
  private resetForm(): void {
    this.roomForm.reset();
    this.selectedFile = null;
    this.uploadProgress = 0;
    
    // Para evitar errores de validación después del reset
    Object.keys(this.roomForm.controls).forEach(key => {
      this.roomForm.get(key)?.setErrors(null);
    });
  }
}
