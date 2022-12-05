import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  channelId: any = '';
  channel: Channel = new Channel();

  constructor(private firestore: AngularFirestore, 
    private route: ActivatedRoute, 
    public dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>  {
        this.channelId = paramMap.get('id');
        console.log('GOT ID:', this.channelId);
        this.getChannel();
    })
  }

  getChannel() {
    if (this.channelId) {
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((channel: any) => {
          this.channel = new Channel(channel);
          console.log('Retrieved channel:', this.channel);
        });      
    }
  }

}
