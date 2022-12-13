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
        this.channelId = paramMap.get('id');
        console.log('GOT ID:', this.channelId);
        this.getChannel();
    });
    this.getUserData();
    this.updateChat();
  }

  getChannel() {
    if (this.channelId) {
      this.fs
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((channel: any) => {
          this.channel = new Channel(channel);
          console.log('Retrieved channel:', this.channel);
        });      
    }
  }


  getUserData() {
    let currentUserAsText = localStorage.getItem('user');
    if (currentUserAsText) {
      this.currentUserJSON = JSON.parse(currentUserAsText);
      this.currentUserName = this.currentUserJSON.displayName;
      this.currentUserId = this.currentUserJSON.uid;
      this.currentUserPhotoUrl = this.currentUserJSON.photoURL;
    }
    console.log(this.currentUserName)
  }


  postMessage() {
    this.message = new Message ({
      uid: this.currentUserId,
      displayName: this.currentUserName,
      photoURL: this.currentUserPhotoUrl,
      message: this.input
    });
    console.log('Adding message', this.message);
    this.fs
    .collection('channels')
    .doc(this.channelId)
    .update({
      messages: arrayUnion(this.message.toJSON()) 
    });
    this.updateChat();
  }


  updateChat() {
    this.input = '';
    this.fs
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((changes: any) => {
      console.log('Recived changes from DB', changes);
      this.chat = changes;
      console.log(this.chat);
      this.renderChat();
    });
  }


  renderChat() {
    this.messages = [];
    this.messages = this.chat.messages;
    console.log(this.messages);
  }


  editMessage() {}


  deleteMessage() {}

}