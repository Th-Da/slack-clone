import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  allUsers: any;
  allChannels: any;

  constructor(private firestore: AngularFirestore) {}

  /**
   * CRUD => READ
   * 1. Gets the data from the users collection
   * 2. Updates the local variable allUsers
   */
  getAllUsers() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  getAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }
}
