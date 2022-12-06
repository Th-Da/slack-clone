import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  downloadURL: any;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService) { }

  /**
   * Loads the new profile picture into the storage
   * @param event 
   */
  uploadImage(event: any) {
    const file = event.target.files[0];
    const filePath = this.authService.userData.uid + '-' + 'profile-picture';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        console.warn('Download URL: ', this.downloadURL);
      })
    ).subscribe()
  }
}
