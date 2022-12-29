import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
  }


  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/welcome']);
  }
}
