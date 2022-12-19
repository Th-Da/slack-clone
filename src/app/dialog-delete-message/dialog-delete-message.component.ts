import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-dialog-delete-message',
  templateUrl: './dialog-delete-message.component.html',
  styleUrls: ['./dialog-delete-message.component.scss']
})
export class DialogDeleteMessageComponent implements OnInit {

  constructor(public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogDeleteMessageComponent>,) { }

  ngOnInit(): void {
  }

}
