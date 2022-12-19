import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.class';
import { Message } from '../_models/message.class';
import { Channel } from '../_models/channel.class';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Directmessage } from '../_models/directmessage.class';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  allUsers: any;
  allChannels: any;
  userData: any; // Gets the data from auth service as observable
  userDataObject: User;

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
  currentMessage: any;

  directmessages: Directmessage = new Directmessage();
  directmessagesId: any = '';
  directmessage: any;
  userIds: any;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {}

  getChannel() {
    if (this.channelId) {
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((channel: any) => {
          this.channel = channel;
          console.log('Retrieved channel:', this.channel);
        });
    } else {
      console.log('no channelId on getChannel()!');
    }
    this.getUserData();
  }

  getUserData() {
    let currentUserAsText = localStorage.getItem('user');
    if (currentUserAsText) {
      this.currentUserJSON = JSON.parse(currentUserAsText);
      this.currentUserName = this.currentUserJSON.displayName;
      this.currentUserId = this.currentUserJSON.uid;
      this.currentUserPhotoUrl = this.currentUserJSON.photoURL;
    }
    console.log(this.currentUserName);
  }

  postMessage() {
    this.message = new Message({
      uid: this.currentUserId,
      displayName: this.currentUserName || 'Guest',
      photoURL:
        this.currentUserPhotoUrl || './../../../assets/img/blank_user.svg',
      message: this.input,
    });
    console.log('Adding message', this.message);
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayUnion(this.message.toJSON()),
      });
    this.updateChat();
  }

  getAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }

  updateChat() {
    this.getChannel();
    if (this.channelId) {
      this.input = '';
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((changes: any) => {
          console.log('Recived changes from DB', changes);
          this.chat = changes;
          console.log(this.chat);
          this.renderChat();
        });
    } else {
      console.log('no channelId on updateChat()!');
    }
  }

  renderChat() {
    this.messages = [];
    this.messages = this.chat.messages;
    console.log(this.messages);
  }

  postDirectmessage() {
    this.firestore.collection('directmessages').doc();
  }

  getDirectmessages() {
    this.firestore
      .collection('directmessages')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.directmessage = changes;
      });
  }

  upadteDirectmessage() {
    this.getDirectmessages();
    if (this.directmessagesId) {
      this.firestore
        .collection('directmessages')
        .doc(this.directmessagesId)
        .valueChanges()
        .subscribe((changes: any) => {
          this.directmessage = changes;
        });
    } else {
      console.log('no directmessagesId on upadteDirectmessage()!');
    }
  }

  deleteMessage(message) {
    this.currentMessage = message;
    console.log('message to delete: ', this.currentMessage);
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayRemove(this.currentMessage),
      });
    this.updateChat();
  }

  /**
   * CRUD => READ
   * 1. Gets the data from the users collection
   * 2. Updates the local variable allUsers
   */
  getAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  /**
   * Updates the current user in the firestore
   * Possible changes: displayName || photoURL
   * @param uid The document id from the 'users' collection
   */
  updateUser(uid: string) {
    this.userDataObject = new User(this.userData); // Convert observable into object
    this.firestore
      .collection('users')
      .doc(uid)
      .update(this.userDataObject.userToJSON());
  }

  /**
   * Deletes the user from the firestore based on the passed user id
   * @param uid The document id from the 'users' collection
   */
  deleteUser(uid: string) {
    this.firestore.collection('users').doc(uid).delete();
  }
}
