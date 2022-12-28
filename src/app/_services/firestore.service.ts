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
  allOtherUsers: Array<any>;
  userData: any; // Gets the data from auth service as observable
  userDataObject: User;

  // ################################################# Channels & Messages
  allChannels: any;
  channelId: any = '';
  messageInput: any;
  channel: Channel = new Channel();
  user: User;
  newMessage: any;
  message: Message = new Message();
  chat: any;
  messages: any = [];
  newMessages: any = [];
  currentMessage: any;
  indexOfMessage: number;
  filteredMessages: Array<any>;

  // ################################################# Direct messages
  directMessages: any; // All direct messages from firestore
  directChatMessages: Array<any>; // The messages array from one single chat
  participantUid: string;
  dmId: string; // The unique id of a direct chat consisting of both user ids
  dmInput: string;
  dmChatExists: boolean;
  participantUser: any;
  participantUserName: string;
  currentMessageDM: any;
  newMessagesDM: any = [];
  indexOfMessageDM: number;
  filteredDirectMessages: Array<any>;

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector
  ) {}

  /**
   * get the correct document from firestore DB and save the content in the chanel variable
   */
  getChannel() {
    if (this.channelId) {
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((channel: any) => {
          this.channel = channel;
        });
    }
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
      message: this.messageInput,
    });
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayUnion(this.message.toJSON()),
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
    this.messageInput = '';
    this.getChannel();

    if (this.channelId) {
      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .valueChanges()
        .subscribe((changes: any) => {
          this.chat = changes;
          this.renderChat();
        });
    }
  }

  renderChat() {
    this.messages = [];
    this.messages = this.chat.messages;
  }

  /**
   * Triggered as soon as a message is sent
   * If a chat between two users already exists, the existing one will be updated
   * Otherwise a new chat will be created
   */
  postDirectMessage() {
    this.getDirectMessages();
    this.checkExistingDmChat();

    if (this.dmChatExists) {
      this.updateDirectMessage();
    } else {
      this.createDirectMessage();
    }
  }

  /**
   * Creates a new entry in the Firestore
   * Document id = userId1-userId2
   */
  createDirectMessage() {
    this.firestore
      .collection('directmessages')
      .doc(this.dmId)
      .set({
        messages: [],
      })
      .then(() => {
        this.updateDirectMessage();
      });
  }

  /**
   * Checks if a dm chat already exists in the Firestore with a specific id
   */
  checkExistingDmChat() {
    const authService = this.injector.get(AuthService);

    let update = setInterval(() => {
      if (this.directMessages != undefined) {
        clearInterval(update);

        if (this.directMessages.length == 0) {
          this.dmChatExists = false;
          this.directChatMessages = [];
        } else {
          for (let i = 0; i < this.directMessages.length; i++) {
            if (
              this.directMessages[i].dmId.includes(authService.userData.uid) &&
              this.directMessages[i].dmId.includes(this.participantUid)
            ) {
              this.dmChatExists = true;
              this.dmId = this.directMessages[i].dmId;
              break;
            } else {
              this.dmChatExists = false;
              this.directChatMessages = [];
            }
          }
        }
      }
    }, 1000 / 60);
  }

  /**
   * Updates an already existing chat in the Firestore
   * With arrayUnion the new message is added to the end of the existing array
   */
  updateDirectMessage() {
    const authService = this.injector.get(AuthService);

    this.message = new Message({
      uid: authService.userData.uid,
      displayName: authService.userData.displayName,
      photoURL: authService.userData.photoURL,
      message: this.dmInput,
    });
    this.firestore
      .collection('directmessages')
      .doc(this.dmId)
      .update({
        messages: arrayUnion(this.message.toJSON()),
      })
      .then(() => {
        this.updateDirectChat();
      });
  }

  /**
   * Fetches all direct messages from the Firestore and saves it locally
   */
  getDirectMessages() {
    this.firestore
      .collection('directmessages')
      .valueChanges({ idField: 'dmId' })
      .subscribe((changes: any) => {
        this.directMessages = changes;
      });
  }

  /**
   * Updates the current chat when you click on a direct chat or reload it
   */
  updateDirectChat() {
    this.getDirectMessages();
    this.checkExistingDmChat();
    this.getParticipantUser();
    this.getDirectChatMessages();
  }

  /**
   * Gets the participant user and it's displayName
   */
  getParticipantUser() {
    this.firestore
      .collection('users')
      .doc(this.participantUid)
      .valueChanges()
      .subscribe((changes) => {
        this.participantUser = changes;
        if (this.participantUser) {
          this.participantUserName = this.participantUser.displayName;
        }
      });
  }

  /**
   * Fetches the current document of the chat from the Firestore and stores the messages array local
   */
  getDirectChatMessages() {
    let update = setInterval(() => {
      if (this.directMessages != undefined) {
        clearInterval(update);
        let filteredDms = this.directMessages.find(
          (chat) => chat.dmId == this.dmId
        );
        if (filteredDms) {
          this.directChatMessages = filteredDms.messages;
        }
      }
    }, 1000 / 60);
  }

  /**
   * removes an element from the messages array on the firestore document.
   */
  deleteMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update({
        messages: arrayRemove(this.currentMessage),
      });
    this.updateChat();
  }

  /**
   * removes an element from the messages array on the firestore document.
   */
  deleteMessageDM() {
    this.firestore
      .collection('directmessages')
      .doc(this.dmId)
      .update({
        messages: arrayRemove(this.currentMessageDM),
      });
    this.updateDirectChat();
  }

  /**
   * removes all elements from the messages array on the firestore document.
   */
  deleteAllMessagesOfChat() {
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

  /**
   * removes all elements from the messages array on the firestore document.
   */
  deleteAllMessagesOfChatDM() {
    for (let i = 0; i < this.directChatMessages.length; i++) {
      const element = this.directChatMessages[i];
      this.firestore
        .collection('directmessages')
        .doc(this.dmId)
        .update({
          messages: arrayRemove(element),
        });
    }
  }

  /**
   * Saves all messages (incl. the edited message) in the firestore document in the messages array.
   */
  saveMessage() {
    this.newMessages.splice(this.indexOfMessage, 1, this.currentMessage);
    for (let i = 0; i < this.newMessages.length; i++) {
      const element = this.newMessages[i];
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
   * Saves all messages (incl. the edited message) in the firestore document in the messages array.
   */
  saveMessageDM() {
    this.newMessagesDM.splice(this.indexOfMessageDM, 1, this.currentMessageDM);
    for (let i = 0; i < this.newMessagesDM.length; i++) {
      const element = this.newMessagesDM[i];
      this.firestore
        .collection('directmessages')
        .doc(this.dmId)
        .update({
          messages: arrayUnion(element),
        });
    }
    this.updateDirectChat();
  }

  /**
   * 1. Gets the data from the users collection
   * 2. Updates the local variable allUsers
   */
  getAllOtherUsers() {
    const authService = this.injector.get(AuthService);

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allOtherUsers = changes.filter(
          (user) => user.uid !== authService.userData.uid
        );
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
