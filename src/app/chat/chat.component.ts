import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public firestoreService: FirestoreService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
