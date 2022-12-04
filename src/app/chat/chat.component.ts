import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }


  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/welcome']);
  }
}
