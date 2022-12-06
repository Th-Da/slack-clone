import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../_models/channel.class';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  channelId: any = '';
  input: any;
  currentUser: any; 
  currentUserJSON: any;
  channel: Channel = new Channel();
  newMessage: any;

  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore, 
    private route: ActivatedRoute, 
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>  {
        this.channelId = paramMap.get('id');
        console.log('GOT ID:', this.channelId);
        this.getChannel();
    });
    this.getUserName();
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


  getUserName() {
    let currentUserAsText = localStorage.getItem('user');
    if (currentUserAsText) {
      this.currentUserJSON = JSON.parse(currentUserAsText);
      this.currentUser = this.currentUserJSON.providerData[0].email;
    }
    console.log(this.currentUser)
  }


  postMessage() {
    this.newMessage = {
      userName: this.currentUser,
      massage: this.input
    };
    console.log('Name :' + this.currentUser);
    console.log('massage :' + this.input);
    console.log('massage :' + this.newMessage);
  }

}
[{
	"resource": "/c:/Users/danie/Desktop/Developer Academy/slack-clone/src/app/chatroom/chatroom.component.html",
	"owner": "_generated_diagnostic_collection_name_#0",
	"code": "-998002",
	"severity": 8,
	"message": "Can't bind to '[(ngModel' since it isn't a known property of 'textarea'.",
	"source": "ngtsc",
	"startLineNumber": 17,
	"startColumn": 23,
	"endLineNumber": 17,
	"endColumn": 44,
	"relatedInformation": [
		{
			"startLineNumber": 17,
			"startColumn": 28,
			"endLineNumber": 17,
			"endColumn": 55,
			"message": "Error occurs in the template of component ChatroomComponent.",
			"resource": "/c:/Users/danie/Desktop/Developer Academy/slack-clone/src/app/chatroom/chatroom.component.ts"
		}
	]
}]