import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-delete-directmessage',
  templateUrl: './dialog-delete-directmessage.component.html',
  styleUrls: ['./dialog-delete-directmessage.component.scss']
})
export class DialogDeleteDirectmessageComponent {

  constructor(
    public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogDeleteDirectmessageComponent>
  ) { }

}
