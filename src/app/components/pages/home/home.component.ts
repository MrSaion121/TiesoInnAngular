import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../layout/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
