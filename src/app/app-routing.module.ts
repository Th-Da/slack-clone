import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './_services/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountComponent } from './account/account.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

const routes: Routes = [
  { path: '', redirectTo: 'get-started', pathMatch: 'full' },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'chat', 
  children: [
    { path: 'welcome', 
    component: WelcomeComponent 
    },
      { path: ':id', 
      component: ChatroomComponent 
    },
    { path: 'account',
    component: AccountComponent 
    }
    ],
    component: ChatComponent, canActivate: [AuthGuard]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
