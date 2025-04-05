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
  faChevronRight 
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
    library.addIcons(
      faFacebookF,
      faTwitter,
      faInstagram,
      faWhatsapp,
      faTelegram,
      faChevronLeft,
      faChevronRight
    );
  }
}