import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DialogDeleteDirectmessageComponent } from '../dialog-delete-directmessage/dialog-delete-directmessage.component';
import { DialogEditDirectmessageComponent } from '../dialog-edit-directmessage/dialog-edit-directmessage.component';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent implements OnInit {
  directMessageForm: FormGroup;
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialog,
    public dialog: MatDialog,
    public firestoreService: FirestoreService,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.setDmChatId();
    this.liveChatUpdate();
    this.scrollToNewestMessage();
    this.firestoreService.updateDirectChat();

    // Subscribe router param to update chat when changing direct message participant
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.firestoreService.updateDirectChat();
        this.scrollToNewestMessage();
      });

    this.directMessageForm = this.fb.group({
      directMessage: ['', [Validators.minLength(1)]],
    });
  }

  /**
   * Scrolls to the newest message in chatroom
   */
  scrollToNewestMessage() {
    let checkContainer = setInterval(() => {
      if (this.scrollContainer) {
        clearInterval(checkContainer);
        let element = this.scrollContainer.nativeElement;
        let scrollHeight = this.scrollContainer.nativeElement.scrollHeight;

        setTimeout(() => {
          element.scrollTo(0, scrollHeight);
        }, 20);

      }
    }, 1000 / 60);
  }

  /**
   * Passes the chat id and the id of the participating user to the service
   */
  setDmChatId() {
    this.route.paramMap.subscribe((paramMap) => {
      this.firestoreService.dmId = paramMap.get('uid');
      this.firestoreService.participantUid = paramMap.get('uid').split('-')[1];
    });
  }

  /**
   * Subscribes the observable from firstore tu update every change from backend
   */
  liveChatUpdate() {
    this.firestore
      .collection('directmessages')
      .valueChanges({ idField: 'dmId' })
      .subscribe((changes) => {
        this.firestoreService.directMessages = changes;
        if (this.firestoreService.directChatMessages != undefined) {
          let cache = this.firestoreService.directMessages.find(chat => chat.dmId == this.firestoreService.dmId);
          this.firestoreService.directChatMessages = cache.messages;
          this.scrollToNewestMessage();
        }
      });
  }

  /**
   * Submits the direct message form
   */
  onSubmit() {
    if (this.directMessageForm.valid) {
      this.firestoreService.dmInput =
        this.directMessageForm.value.directMessage;
      this.firestoreService.postDirectMessage();
      this.messageInput.nativeElement.value = '';
    }
  }

  dialogEditMessageDM(message) {
    this.firestoreService.indexOfMessageDM =
      this.firestoreService.directChatMessages.indexOf(message);
    this.firestoreService.currentMessageDM = message;
    this.firestoreService.newMessagesDM =
      this.firestoreService.directChatMessages;
    this.firestoreService.deleteMessageDM();
    this.dialog.open(DialogEditDirectmessageComponent, { disableClose: true });
  }

  dialogDeleteMessageDM(message) {
    this.firestoreService.currentMessageDM = message;
    this.dialog.open(DialogDeleteDirectmessageComponent);
  }
}
