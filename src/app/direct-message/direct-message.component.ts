import { Component, OnInit } from '@angular/core';
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
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public dialogRef: MatDialog,
    public firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.firestoreService.dmId = paramMap.get('uid');
      this.firestoreService.participantUid = paramMap.get('uid').split('-')[1];
      this.firestoreService.getUser(paramMap.get('uid').split('-')[1]);
    });
  }
}
