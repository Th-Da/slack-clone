import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  searchFormControl = new FormControl('');
  options: any = [];
  filteredOptions: Observable<string[]>;

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    public router: Router,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.firestoreService.getAllOtherUsers();
    this.firestoreService.getAllChannels();
    this.firestoreService.getDirectMessages();
    this.filterMessages();
  }

  filterMessages() {
    let update = setInterval(() => {
      if (this.firestoreService.directMessages !== undefined) {
        clearInterval(update);
        for (
          let index = 0;
          index < this.firestoreService.directMessages.length;
          index++
        ) {
          const element = this.firestoreService.directMessages[index];
          for (let index = 0; index < element['messages'].length; index++) {
            const messages = element['messages'][index];
            let singleMessage: any = Object.values(messages);
            singleMessage.forEach((element) => {
              this.options.push(element);
            });
          }
        }
        this.filteredOptions = this.searchFormControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      }
    });
  }

  _filter(value: string): string[] {
    if (value) {
      const filterValue = this._normalizeValue(value);
      let allOptions = this.options.filter((option) =>
        this._normalizeValue(option).includes(filterValue)
      );
      let filteredTest: any = [...new Set(allOptions)];
      return filteredTest;
    } else {
      return [];
    }
  }

  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  openChat(url, id) {
    this.router.navigate([url + id]).then(() => {
      this.firestoreService.updateChat();
    });
  }

  openDirectMessage(url, uid) {
    this.router
      .navigate([url + this.authService.userData.uid + '-' + uid])
      .then(() => {
        this.firestoreService.dmId = this.authService.userData.uid + '-' + uid;
        this.firestoreService.updateDirectChat();
      });
  }

  openDialog() {
    this.dialog.open(DialogAddChannelComponent);
  }
}
