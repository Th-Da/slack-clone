import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from '../_models/channel.class';
import { Message } from '../_models/message.class';
import { User } from '../_interfaces/user';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';
// import { firestore } from 'firebase/app';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  channelId: any = '';
  input: any;
  currentUserName: any;
  currentUserId: any;
  currentUserPhotoUrl: any;
  currentUserJSON: any;
  channel: Channel = new Channel();
  user: User;
  newMessage: any;
  message: Message = new Message();
  chat: any;
  messages: any = [];
  

  constructor(
    public authService: AuthService,
    private fs: AngularFirestore, 
    private route: ActivatedRoute, 
    public router: Router,
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>  {
        this.firestoreService.channelId = paramMap.get('id');
        console.log('GOT ID:', this.firestoreService.channelId);
    });
    this.firestoreService.updateChat();
  }


}