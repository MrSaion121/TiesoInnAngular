import { TestBed } from '@angular/core/testing';
import { AuthGoogleService } from './auth-google.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGoogleService', () => {
  let service: AuthGoogleService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGoogleService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthGoogleService);
  });

  it('should clear localStorage and navigate to /login on logout', () => {
    localStorage.setItem('user', 'test-user');
    localStorage.setItem('token', 'test-token');

    service.logout();

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
