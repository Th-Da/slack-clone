import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.utilsService.searchBarActivated = false;
  }

  ngOnDestroy(): void {
    this.utilsService.searchBarActivated = true;
  }

}
