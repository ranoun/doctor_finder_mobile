import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnDestroy {
  user: any = {};
  doctorDetails: any = null;
  isDoctor: boolean = false;
  loading: boolean = true;
  viewedUserId: number | null = null;
  isOwnProfile: boolean = true;
  private routeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {
    // Subscribe to query parameter changes
    this.routeSubscription = this.route.queryParamMap.subscribe(params => {
      this.viewedUserId = params.get('user_id') 
        ? parseInt(params.get('user_id')!, 10) 
        : null;
      this.loadProfile();
    });
  }

  ionViewWillEnter() {
    // This will still trigger on view entry, but loadProfile is already handled by the subscription
    //this.loading = true;
    this.loadProfile();
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async loadProfile() {
    this.loading = true;
    this.isDoctor = this.authService.isDoctor();
    const currentUser = this.authService.getUser();
  
    if (this.viewedUserId && this.isDoctor) {
      this.isOwnProfile = false;
      this.doctorService.getUserProfile(this.viewedUserId).subscribe({
        next: (data) => {
          this.user = data;
          this.doctorDetails = null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading patient profile:', err);
          this.loading = false;
          // Add toast notification here
        }
      });
    } else if (this.isDoctor) {
      this.isOwnProfile = true;
      this.user = currentUser;
      this.doctorService.getDoctorById(this.user.doctor_id).subscribe({
        next: (data) => {
          this.doctorDetails = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading doctor details:', err);
          this.loading = false;
          // Add toast notification here
        }
      });
    } else {
      this.isOwnProfile = true;
      this.user = currentUser;
      this.doctorDetails = null;
      this.loading = false;
    }
  }

  async doRefresh(event: RefresherCustomEvent) {
    this.viewedUserId = null; // Reset viewedUserId on refresh to show own profile
    await this.loadProfile();
    event.target.complete();
  }
}