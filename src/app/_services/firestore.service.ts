import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../_models/user.class';
import { Message } from '../_models/message.class';
import { Channel } from '../_models/channel.class';
import { arrayUnion, arrayRemove } from "firebase/firestore";
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
  indexOfMessage: number;
  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
  ) { }


/**
 * get the correct document from firestore DB and save the content in the chanel variable
 */
  getChannel() {
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((channel: any) => {
          this.channel = channel;
          //console.log('Retrieved channel:', this.channel);
        });
  }


  /**
   * 1. saves a new message in the firestore document in the messages array.
   * 2. updates the chat.
   */
  postMessage() {
    const authService = this.injector.get(AuthService);
    this.message = new Message({
      uid: authService.userData.uid,
      displayName: authService.userData.displayName,
      photoURL: authService.userData.photoURL,
      message: this.input
    });
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayUnion(this.message.toJSON())
      });
    this.updateChat();
  }


  /**
   * get all documents from the firestore collection ('channels') and save the content in the chanel variable
   */
  getAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }


  /**
   * 1. empty the input at textarea.
   * 2. get the data from the firestore document 
   */
  updateChat() {
    this.input = '';
    this.getChannel();
      this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.chat = changes;
        this.renderChat();
      });
  }

  renderChat() {
    this.messages = [];
    this.messages = this.chat.messages;
  }


  /**
   * removes an element from the messages array on the firestore document.
   */
  deleteMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayRemove(this.currentMessage)
      });
    this.updateChat();
    console.log('message deleted!', this.currentMessage);
  }


  /**
   * removes all elements from the messages array on the firestore document.
   */
  deleteAllMessagesOfChat() {
    for (let i = 0; i < this.messages.length; i++) {
      const element = this.messages[i];
      console.log('deletet message: ', element);
      this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayRemove(element) 
      });
    }
  }


  /**
   * 1. saves all messages (incl. the edited message) in the firestore document in the messages array.
   * 
   */
  saveMessage() {
      this.newMessages.splice(this.indexOfMessage, 1, this.currentMessage)
      for (let i = 0; i < this.newMessages.length; i++) {
        const element = this.newMessages[i];
        this.firestore
        .collection('channels')
        .doc(this.channelId)
        .update({
          messages: arrayUnion(element) 
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
    this.firestore.collection('users')
      .doc(uid)
      .delete()
  }
}
