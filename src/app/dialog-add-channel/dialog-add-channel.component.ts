import { Component, OnInit } from '@angular/core';
import { Channel } from '../models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  constructor(public afs: AngularFirestore) {}
  channel = new Channel();

  ngOnInit(): void {}
  /* (click)="createChannel($event) */

  createChannel(channel) {
    this.afs
      .collection('channels')
      .add(Object.assign({}, this.channel))
      .then((result: any) => {
        console.log(result);
      });
  }
}
