import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../_models/user.class';
import { Message } from '../_models/message.class';
import { Channel } from '../_models/channel.class';
import { arrayUnion, arrayRemove, endBefore } from 'firebase/firestore';
import { AuthService } from './auth.service';

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
  channel: Channel = new Channel();
  user: User;
  newMessage: any;
  message: Message = new Message();
  chat: any;
  messages: any = [];
  currentMessage: any;

  directmessage: any;
  directmessagesId: any;
  dmId: string;
  participantUid: string;
  participantUser: any;
  userIds: any;
  dmInput: string;

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
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
  }

  postMessage() {
    const authService = this.injector.get(AuthService);

    this.message = new Message({
      uid: authService.userData.uid,
      displayName: authService.userData.displayName,
      photoURL: authService.userData.photoURL,
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
    const authService = this.injector.get(AuthService);

    debugger;
    // if (this.dmId.includes(this.participantUid && authService.userData.uid)) {
    //   console.log('Funzt');
    // } else {
    //   console.log('Njet');
    // }

    this.firestore
      .collection('directmessages')
      .doc(this.dmId)
      .set({
        participants: {
          user1: new User(authService.userData).userToJSON(),
          user2: new User(this.participantUser).userToJSON(),
        },
        // postDirectmessages(dmId, message);
      });
  }

  // postDirectmessages(dmId, message) {
  //   this.firestore
  //     .collection('channels')
  //     .doc(this.channelId)
  //     .update({
  //       messages: arrayUnion(this.message.toJSON()),
  //     });
  // }

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

  getUser(uid: string) {
    let allUsers = [];

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        allUsers = changes;
        const user = allUsers.find((user) => user.uid == uid);
        this.participantUser = user;
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
