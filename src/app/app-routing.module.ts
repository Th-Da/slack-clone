import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './_guards/auth.guard';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';

const routes: Routes = [
  { path: '', redirectTo: 'get-started', pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: DialogForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  {
    path: 'chat',
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'ch/:id', component: ChatroomComponent },
      { path: 'dm/:uid', component: DirectMessageComponent },
    ],
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
