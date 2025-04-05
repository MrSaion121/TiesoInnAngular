import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ForgotPasswordComponent } from './components/pages/login/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { ReservationComponent } from './components/pages/rooms/reservation/reservation.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, children: [
        {path: 'forgot-password', component: ForgotPasswordComponent}
    ] },
    {path: 'register', component: RegisterComponent},
    {path: 'rooms', component: RoomsComponent, children: [
        {path: ':id', component: ReservationComponent}
    ]},
    {path: 'chat', component: ChatComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '**', component: NotFoundComponent}
];
