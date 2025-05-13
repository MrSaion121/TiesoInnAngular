import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../modules/material/material.module';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        HomeComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hotel name in heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tieso Inn');
  });

  it('should have a "Reservar ahora" button', () => {
    const reserveButton = fixture.debugElement.query(By.css('.cta-button'));
    expect(reserveButton).toBeTruthy();
    expect(reserveButton.nativeElement.textContent).toContain('Reservar ahora');
  });

  it('should navigate to rooms when "Reservar ahora" is clicked', () => {
    const reserveButton = fixture.debugElement.query(By.css('.cta-button'));
    reserveButton.nativeElement.click();
    expect(reserveButton.attributes['routerLink']).toBe('/rooms') ;
  });

  it('should display info section with cards', () => {
    const infoSection = fixture.debugElement.query(By.css('.info-section'));
    expect(infoSection).toBeTruthy();
    
    // Check if info cards are listed
    const infoCards = fixture.debugElement.queryAll(By.css('.info-card'));
    expect(infoCards.length).toBeGreaterThan(0);
  });
});