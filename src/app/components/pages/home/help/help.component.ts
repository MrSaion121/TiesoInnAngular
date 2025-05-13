import { Component } from '@angular/core';
import { NavbarComponent } from "../../../layout/navbar/navbar.component";

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../modules/material/material.module';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [NavbarComponent, MaterialModule, FormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  message: string = '';

  sendMessage() {
    if (this.message.trim()) {
      console.log("Mensaje enviado:", this.message);
      this.message = '';
    }
  }
}
