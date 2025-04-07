import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    console.log(!!localStorage.getItem('token'))
    this.isLoggedIn = !!localStorage.getItem('token')
  }
  
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
