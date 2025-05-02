import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGoogleService } from '../../../shared/services/auth-google.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-google-verification',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="google-verification-container">
      <h2>Verificando tu cuenta de Google</h2>
      <mat-spinner *ngIf="loading"></mat-spinner>
      <p *ngIf="error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .google-verification-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    h2 {
      margin-bottom: 20px;
    }
    p {
      color: red;
      margin-top: 20px;
    }
  `]
})


export class GoogleVerificationComponent implements OnInit {
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute, 
    private googleService: AuthGoogleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    // Extraer el token del fragmento URL
    const fragment = this.route.snapshot.fragment;
    console.log("Fragment recibido:", fragment);
    
    const hashParams = new URLSearchParams(fragment || '');
    const token = hashParams.get('id_token');
    
    console.log("Token encontrado:", token ? "Sí (primeros 10 caracteres: " + token.substring(0, 10) + "...)" : "No");

    if (token) {
      // Enviar token al backend
      this.googleService.getToken(token).subscribe({
        next: (response) => {
          console.log('Token verificado:', response);
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al verificar token:', err);
          this.error = 'Error al verificar tu cuenta. Por favor intenta nuevamente.';
          this.loading = false;
          this.snackBar.open(
            err.error?.error || 'Error al verificar el token de Google', 
            'Cerrar', 
            { duration: 5000 }
          );
        }
      });
    } else {
      this.error = 'No se recibió un token válido de Google';
      this.loading = false;
      this.snackBar.open('No se recibió un token válido de Google', 'Cerrar', {
        duration: 5000
      });
    }
  }
}