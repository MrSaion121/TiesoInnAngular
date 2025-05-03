import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const httpClient = inject(HttpClient);

  const token = localStorage.getItem('token')
  if(!token) {
    router.navigate(['/login']);
    return of(false);
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return httpClient.get(`${environment.apiUrl}/auth/me`, { headers })
  .pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return of(false);
    })
  )
};
