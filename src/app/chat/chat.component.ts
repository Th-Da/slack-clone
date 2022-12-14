import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Channel } from '../_models/channel.class';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    public router: Router,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.firestoreService.getAllChannels();
  }

  openChat(url, id) {
    this.router.navigate([url + id])
    .then(() => {
      this.firestoreService.updateChat();
    });
  }

  openDialog() {
    this.dialog.open(DialogAddChannelComponent);
  }
}
