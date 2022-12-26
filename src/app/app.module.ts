import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { GetStartedComponent } from './get-started/get-started.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from './_services/auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { DialogAuthErrorsComponent } from './dialog-auth-errors/dialog-auth-errors.component';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogGuestUserComponent } from './dialog-guest-user/dialog-guest-user.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DialogEditMessageComponent } from './dialog-edit-message/dialog-edit-message.component';
import { DialogDeleteMessageComponent } from './dialog-delete-message/dialog-delete-message.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { DialogDeleteDirectmessageComponent } from './dialog-delete-directmessage/dialog-delete-directmessage.component';
import { DialogEditDirectmessageComponent } from './dialog-edit-directmessage/dialog-edit-directmessage.component';
import { DialogAccountComponent } from './dialog-account/dialog-account.component';

@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent,
    SignUpComponent,
    LoginComponent,
    ChatComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    WelcomeComponent,
    DialogAuthErrorsComponent,
    DialogAddChannelComponent,
    DialogDeleteUserComponent,
    DialogEditUserComponent,
    DialogGuestUserComponent,
    LegalNoticeComponent,
    ChatroomComponent,
    DialogEditMessageComponent,
    DialogDeleteMessageComponent,
    DirectMessageComponent,
    DialogDeleteDirectmessageComponent,
    DialogEditDirectmessageComponent,
    DialogAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
