import { Component, OnInit, OnDestroy } from '@angular/core';
import { FontawesomeModule } from '../../../modules/fontawesome/fontawesome.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FontawesomeModule, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [0, 1, 2]; // Number of slides
  private intervalId: number | null = null;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateCarousel();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  updateCarousel(): void {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
      const position = (index - this.currentSlide) * 100;
      (item as HTMLElement).style.transform = `translateX(${position}%)`;
    });
  }
}
