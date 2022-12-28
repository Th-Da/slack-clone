import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/_models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  constructor(
    public afs: AngularFirestore,
    public ref: MatDialogRef<DialogAddChannelComponent>
  ) { }
  channel = new Channel();

  ngOnInit(): void { }
  /* (click)="createChannel($event) */

  createChannel() {
    this.afs
      .collection('channels')
      .add(Object.assign({}, this.channel))
      .then((result: any) => {
        this.ref.close();
      });
  }
}
