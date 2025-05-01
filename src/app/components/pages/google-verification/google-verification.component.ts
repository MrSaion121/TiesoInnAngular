import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthGoogleService } from '../../../shared/services/auth-google.service';


@Component({
  selector: 'app-google-verification',
  standalone: true,
  imports: [],
  templateUrl: './google-verification.component.html',
  styleUrl: './google-verification.component.scss'
})
export class GoogleVerificationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private googleService: AuthGoogleService) {}
  
  
  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    const hashParams = new URLSearchParams(fragment || '');
    const token = hashParams.get('id_token');

    if(token){
      //this.googleService.getToken(token).susbcribe
    } else {
      //alert('No tienes token');
    }
  }

}
