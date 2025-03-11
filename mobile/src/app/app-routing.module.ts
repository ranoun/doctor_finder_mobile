import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'appointments', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsPageModule), canActivate: [AuthGuard] },
  { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule), canActivate: [AuthGuard] },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule), canActivate: [AuthGuard] },
  { path: 'doctor-profile', loadChildren: () => import('./doctor-profile/doctor-profile.module').then(m => m.DoctorProfilePageModule) },  
  { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule), canActivate: [AuthGuard] },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule), canActivate: [AuthGuard] },
  {
    path: 'messages-list',
    loadChildren: () => import('./messages-list/messages-list.module').then( m => m.MessagesListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),canActivate: [AuthGuard]
  }

// Updated route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}