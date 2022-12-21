import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../_models/user.class';
import { Message } from '../_models/message.class';
import { Channel } from '../_models/channel.class';
import { arrayUnion, arrayRemove } from 'firebase/firestore';
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
  newMessages: any = [];
  currentMessage: any;

  directMessages: any; // All direct messages from firestore
  directmessagesId: any;
  participantUid: string;
  dmId: string; // The unique id of a direct chat consisting of both user ids
  dmInput: string;
  dmChatExists: boolean;
  indexOfMessage: number;

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
          this.chat = changes;
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

  /**
   * Triggered as soon as a message is sent
   * If a chat between two users already exists, the existing one will be changed
   * Otherwise a new chat will be created
   */
  createDmChat() {
    this.getDirectmessages();
    this.checkExistingDmChat();

    if (this.dmChatExists) {
      this.postDirectmessages(this.dmId);
    } else {
      this.firestore
        .collection('directmessages')
        .doc(this.dmId)
        .set({
          messages: [],
        })
        .then(() => {
          this.postDirectmessages(this.dmId);
        });
    }
  }

  /**
   * Checks if a dm chat already exists in the Firestore with a specific id
   */
  checkExistingDmChat() {
    const authService = this.injector.get(AuthService);

    if (this.directMessages.length == 0) {
      console.log('chat doesnt exist');
      this.dmChatExists = false;
    } else {
      this.directMessages.forEach((element) => {
        if (
          element.dmId.includes(authService.userData.uid && this.participantUid)
        ) {
          this.dmChatExists = true;
          this.dmId = element.dmId;
        } else {
          this.dmChatExists = false;
        }
      });
    }
  }

  postDirectmessages(dmId: string) {
    const authService = this.injector.get(AuthService);

    this.message = new Message({
      uid: authService.userData.uid,
      displayName: authService.userData.displayName,
      photoURL: authService.userData.photoURL,
      message: this.dmInput,
    });
    this.firestore
      .collection('directmessages')
      .doc(dmId)
      .update({
        messages: arrayUnion(this.message.toJSON()),
      });
  }

  getDirectmessages() {
    this.firestore
      .collection('directmessages')
      .valueChanges({ idField: 'dmId' })
      .subscribe((changes: any) => {
        this.directMessages = changes;
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
          this.directMessages = changes;
        });
    } else {
      console.log('no directmessagesId on upadteDirectmessage()!');
    }
  }

  deleteMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayRemove(this.currentMessage),
      });
    this.updateChat();
    console.log('message deleted!', this.currentMessage);
  }

  deleteAllMessagesOfChat() {
    this.newMessages = this.messages;
    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .update({
          messages: arrayRemove(element),
        });
    }
  }

  saveMessage() {
    this.newMessages[this.indexOfMessage] = this.currentMessage;

    for (let i = 0; i < this.newMessages.length; i++) {
      const element = this.newMessages[i];
      console.log('New messages on firestore: ', element);
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .update({
          messages: arrayUnion(element),
        });
    }
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
