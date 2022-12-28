import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/_services/firestore.service';


@Component({
  selector: 'app-dialog-edit-message',
  templateUrl: './dialog-edit-message.component.html',
  styleUrls: ['./dialog-edit-message.component.scss']
})
export class DialogEditMessageComponent implements OnInit {

  constructor(public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogEditMessageComponent>,) { }

  ngOnInit(): void {
  }

}
