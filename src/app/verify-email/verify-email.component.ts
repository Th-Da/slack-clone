import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, public utils: UtilsService) { }

  ngOnInit(): void { }

}
