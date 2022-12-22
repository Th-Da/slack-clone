import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteMessageComponent } from '../dialog-delete-message/dialog-delete-message.component';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  messageForm: FormGroup;
  @ViewChild('messageInput') messageInput;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.firestoreService.channelId = paramMap.get('id');
      console.log('GOT ID:', this.firestoreService.channelId);
    });

    this.messageForm = this.fb.group({
      message: ['', [Validators.minLength(1)]],
    });

    this.firestoreService.updateChat();
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
    console.log('index of message: ', this.firestoreService.indexOfMessage);
    this.firestoreService.currentMessage = message;
    this.firestoreService.deleteAllMessagesOfChat();
    console.log('message to edit: ', this.firestoreService.currentMessage);
    this.dialog.open(DialogEditMessageComponent, { disableClose: true });
  }
}
