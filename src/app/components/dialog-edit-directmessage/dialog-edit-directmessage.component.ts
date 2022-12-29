import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-dialog-edit-directmessage',
  templateUrl: './dialog-edit-directmessage.component.html',
  styleUrls: ['./dialog-edit-directmessage.component.scss']
})
export class DialogEditDirectmessageComponent {

  constructor(
    public firestoreService: FirestoreService,
    public dialogRef: MatDialogRef<DialogEditDirectmessageComponent>) { }

}
