import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  currentUrl: string;
  isFiltered: boolean = false;
  searchInput: string;
  searchBarActivated: boolean = false;

  constructor(private router: Router) { }

  /**
   * Redirects to the login page and reloads the page once
   * Is necessary to avoid login problems
   */
  redirectToLogin() {
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
