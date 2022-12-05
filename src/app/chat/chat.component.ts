import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) {}

  channel = new Channel();

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogAddChannelComponent);
  }
}
