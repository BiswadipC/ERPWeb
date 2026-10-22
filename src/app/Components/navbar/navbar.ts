import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router){}
  as = inject(AuthService);

  Logout()
  {
    this.as.Logout().subscribe({
      next: res => {
        sessionStorage.clear();
        this.router.navigateByUrl('');
      }
    });
  } // Logout...
} // class...
