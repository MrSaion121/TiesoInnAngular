import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Token } from '@angular/compiler';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthResponse = {
    token: 'mockToken',
    user: {
      id: '12345',
      name: 'Juan Perez',
      email: 'juan@perez.com',
      role: 'user',
    },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token and user in localStorage',() => {
    const loginData = { email: 'juan@perez.com', password: 'password123' };

    service.login(loginData).subscribe((response) => {
      expect(response).toEqual(mockAuthResponse);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockAuthResponse.user));
      expect(localStorage.getItem('token')).toEqual(mockAuthResponse.token);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should register a new user with RegisterComponent form data and store token and user in localStorage', () => {
    // Mock data matching the RegisterComponent form structure
    const registerData = {
      name: 'Juan Perez',
      email: 'juan@perez.com',
      cellphone: '1234567890', 
      password: 'password123'
      // Note: confirmPassword would be removed before sending to the service
    };

    service.register(registerData).subscribe((response) => {
      expect(response).toEqual(mockAuthResponse);
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockAuthResponse.user));
      expect(localStorage.getItem('token')).toEqual(mockAuthResponse.token);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(registerData);
    req.flush(mockAuthResponse);
  });
});

