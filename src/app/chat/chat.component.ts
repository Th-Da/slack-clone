import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DialogAccountComponent } from '../dialog-account/dialog-account.component';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { AuthService } from '../_services/auth.service';
import { FirestoreService } from '../_services/firestore.service';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.applyResponsiveNav();
  }

  mobileNav: boolean = false;
  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService,
    public router: Router,
    public dialog: MatDialog,
    public utilService: UtilsService
  ) { }

  ngOnInit(): void {
    this.firestoreService.getAllOtherUsers();
    this.firestoreService.getAllChannels();
    this.firestoreService.getDirectMessages();
  }

  ngAfterViewInit(): void {
    this.applyResponsiveNav();
  }

  /**
   * Toggle the MatDrawer in Mobile View
   */
  toggleNav() {
    if (this.mobileNav) {
      this.drawer.toggle();
      this.drawer.mode = 'over';
    }
  }

  /**
   * Checks the window.innerheight and enables/disables the responsive view accordingly
   */
  applyResponsiveNav() {
    if (window.innerWidth < 768) {
      this.drawer.close();
      this.mobileNav = true;
      this.drawer.mode = 'over';
    } else {
      this.drawer.open();
      this.mobileNav = false;
      this.drawer.mode = 'side';
    }
  }

  filter(value: string) {
    if (value != '') {
      this.utilService.isFiltered = true;
    } else {
      this.utilService.isFiltered = false;
    }

    if (this.utilService.currentUrl.includes('chat/ch')) {
      this.filterChannels(value);
    } else {
      this.filterDms(value);
    }
  }

  filterChannels(value: string) {
    this.firestoreService.filteredMessages =
      this.firestoreService.messages.filter((option) =>
        option.message.toLowerCase().includes(value.toLowerCase())
      );
  }

  filterDms(value: string) {
    this.firestoreService.filteredDirectMessages =
      this.firestoreService.directChatMessages.filter((option) =>
        option.message.toLowerCase().includes(value.toLowerCase())
      );
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

  openAccountDialog() {
    this.dialog.open(DialogAccountComponent);
  }

  openEditUserDialog() {
    this.dialog.open(DialogEditUserComponent);
  }

  openDialog() {
    this.dialog.open(DialogAddChannelComponent);
  }
}
