import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faWhatsapp, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faChevronLeft, 
  faChevronRight,
  faHotel,
  faBullseye,
  faEye
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontawesomeModule { 
  constructor(library: FaIconLibrary) {
    // Add icons to the library for convenient access in components
    library.addIcons(
      faFacebookF,
      faTwitter,
      faInstagram,
      faWhatsapp,
      faTelegram,
      faChevronLeft,
      faChevronRight,
      faHotel,
      faBullseye,
      faEye
    );
  }
}