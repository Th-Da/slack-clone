import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Channel } from '../models/channel.class';
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
    private firestoreService: FirestoreService,
    public dialog: MatDialog,
    public afs: AngularFirestore
  ) {}

  channel = new Channel();
  allChannels = [];

  ngOnInit(): void {
    this.afs
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }

  openDialog() {
    this.dialog.open(DialogAddChannelComponent);
  }
}
