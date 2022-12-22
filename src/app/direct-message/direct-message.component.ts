import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent implements OnInit {
  directMessageForm: FormGroup;
  @ViewChild('messageInput') messageInput;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setDmChatId();
    this.firestoreService.updateDirectChat();
    this.directMessageForm = this.fb.group({
      directMessage: ['', [Validators.minLength(1)]],
    });
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
   * Submits the direct message form
   */
  onSubmit() {
    debugger;
    if (this.directMessageForm.valid) {
      this.firestoreService.dmInput = this.directMessageForm.value.directMessage;
      this.firestoreService.postDirectMessage();
      this.messageInput.nativeElement.value = '';
    }
  }
}
