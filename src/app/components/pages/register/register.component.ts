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
import { confirmPasswordValidator } from '../../../shared/confirmed-password.validator';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, 
    { validators: confirmPasswordValidator('password', 'confirmPassword')})
  }

  toggleVisibility() {
    this.hide = !this.hide;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    // Eliminar el campo confirmPassword antes de enviar
    const userData = { ...this.registerForm.value };
    delete userData.confirmPassword;
    
    this.authService.register(userData).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { 
          duration: 3000 
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.error?.error || 'Error al registrar usuario', 'Cerrar', { 
          duration: 5000 
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
