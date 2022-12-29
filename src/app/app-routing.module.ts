import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { DialogForgotPasswordComponent } from './components/dialog-forgot-password/dialog-forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { CannelsComponent } from './components/cannels/cannels.component';
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
      { path: 'ch/:id', component: CannelsComponent },
      { path: 'dm/:uid', component: DirectMessageComponent },
    ],
    component: MainComponent,
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
