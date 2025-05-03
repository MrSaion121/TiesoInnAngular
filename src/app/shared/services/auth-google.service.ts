import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private apiUrl = environment.production 
    ? 'https://tiesoinnapi.onrender.com/api' 
    : 'http://localhost:10000/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // Inicia el flujo de autenticación de Google
  googleLogin() {
    const clientId = environment.googleClientId;
    const redirectUri = encodeURIComponent(`${window.location.origin}/google`);
    const responseType = 'id_token';
    const scope = encodeURIComponent('email profile');
    const nonce = Math.random().toString(36).substring(2);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&prompt=select_account&scope=${scope}&nonce=${nonce}`;
    window.location.href = url;
  }

  // Envía el token recibido de Google al backend
  getToken(token: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/google`, { idToken: token })
      .pipe(
        tap(response => this.saveUserData(response))
      );
  }

  // Guarda la información del usuario autenticado
  saveUserData(data: any): void {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Cierra sesión
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

