import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UtilsService } from '../_services/utils.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    constructor(public authService: AuthService, public utils: UtilsService) { }

    ngOnInit(): void { }
}

