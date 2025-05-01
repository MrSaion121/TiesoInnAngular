import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private httpClient: HttpClient) { }

  googleLogin() {
    const clientId = environment.googleClientId;
    const redirectUri = encodeURIComponent(`${window.location.origin}/google`);
    const responseType = 'id_token';
    const scope = encodeURIComponent('email profile');
    const nonce = Math.random().toString(36).substring(2);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&prompt=select_account&scope=${scope}&nonce=${nonce}`;
    window.location.href = url
  }

  //getToken(token: string): Observable<{token: string}> {}
}
