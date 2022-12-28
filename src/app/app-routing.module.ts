import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './_guards/auth.guard';
import { DialogForgotPasswordComponent } from './dialog-forgot-password/dialog-forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';

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
export class AppRoutingModule {}
