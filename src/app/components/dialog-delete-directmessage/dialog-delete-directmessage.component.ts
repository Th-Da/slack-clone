import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/_services/firestore.service';

@Component({
  selector: 'app-dialog-delete-directmessage',
  templateUrl: './dialog-delete-directmessage.component.html',
  styleUrls: ['./dialog-delete-directmessage.component.scss']
})
export class DialogDeleteDirectmessageComponent implements OnInit {

  constructor(public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogDeleteDirectmessageComponent>) { }

  ngOnInit(): void {
  }

}
