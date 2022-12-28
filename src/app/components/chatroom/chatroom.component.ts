import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DialogDeleteMessageComponent } from '../dialog-delete-message/dialog-delete-message.component';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  messageForm: FormGroup;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    public utilService: UtilsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.firestoreService.channelId = paramMap.get('id');
    });
    // Subscribe router param to update chat when changing channel
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.firestoreService.updateChat();
        this.scrollToNewestMessage();
        this.firestoreService.filteredMessages = [];
        this.utilService.searchInput = '';
        this.utilService.isFiltered = false;
      });

    this.messageForm = this.fb.group({
      message: ['', [Validators.minLength(1)]],
    });
    this.firestoreService.updateChat();
    this.liveChatUpdate();
    this.scrollToNewestMessage();
    this.firestoreService.filteredMessages = [];
    this.utilService.currentUrl = this.router.url;
    this.utilService.searchBarActivated = true;
  }

  /**
   * Subscribes the observable from firstore tu update every change from backend
   */
  liveChatUpdate() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'channelId' })
      .subscribe((changes: any) => {
        this.firestoreService.chat = changes;

        if (this.firestoreService.chat != undefined) {
          let cache = this.firestoreService.chat.find(
            (chat) => chat.channelId == this.firestoreService.channelId
          );
          this.firestoreService.messages = cache.messages;
          this.scrollToNewestMessage();
        }
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
   * Submits the message form
   */
  onSubmit() {
    if (this.messageForm.valid) {
      this.firestoreService.messageInput = this.messageForm.value.message;
      this.firestoreService.postMessage();
      this.messageInput.nativeElement.value = '';
    }
  }

  dialogDeleteMessage(message) {
    this.firestoreService.currentMessage = message;
    this.dialog.open(DialogDeleteMessageComponent);
  }

  dialogEditMessage(message) {
    this.firestoreService.indexOfMessage =
      this.firestoreService.messages.indexOf(message);
    this.firestoreService.currentMessage = message;
    this.firestoreService.newMessages = this.firestoreService.messages;
    this.firestoreService.deleteMessage();
    this.dialog.open(DialogEditMessageComponent, { disableClose: true });
  }
}
