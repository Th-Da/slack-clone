import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Channel } from '../_models/channel.class';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  searchFormControl = new FormControl();
  options: string[] = this.firestoreService.allChannels;
  filteredOptions: Observable<any[]>;
  filterValue;

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.firestoreService.getAllOtherUsers();
    this.firestoreService.getAllChannels();
    this.firestoreService.getDirectMessages();
    this.filteredOptions = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  _filter(value: string): any {
    if (value) {
      debugger;
      this.filterValue = value.toLowerCase();
      return this.options.filter((option) =>
        option.toLowerCase().includes(this.filterValue)
      );
    }
  }

  // NUR MIT LIBARY MÖGLICH: https://www.npmjs.com/package/angular-ng-autocomplete?activeTab=readme
  // customFilter = function (countries: any[], query: string): any[] {
  //   return countries.filter((x) =>
  //     x.toLowerCase().startsWith(query.toLowerCase())
  //   );
  // };

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
