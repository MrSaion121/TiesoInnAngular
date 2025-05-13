import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
            },
          },
        },
        AuthService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method from authService', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should call register method from authService', () => {
    const authService = TestBed.inject(AuthService);
    const mockRegisterData = {
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    };

    const mockResponse = {
      token: 'fake-token',
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      }
    };

    const registerSpy = spyOn(authService, 'register').and.returnValue(of(mockResponse));

    authService.register(mockRegisterData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(registerSpy).toHaveBeenCalledWith(mockRegisterData);
  });
});
