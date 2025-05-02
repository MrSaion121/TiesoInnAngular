import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthGoogleService } from '../../../shared/services/auth-google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    RouterModule, 
    MatIconModule, 
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleService: AuthGoogleService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { 
          duration: 3000 
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.error?.error || 'Error al iniciar sesión', 'Cerrar', { 
          duration: 5000 
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle() {
    this.googleService.googleLogin();
  }
}

