import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteDirectmessageComponent } from './dialog-delete-directmessage.component';

describe('DialogDeleteDirectmessageComponent', () => {
  let component: DialogDeleteDirectmessageComponent;
  let fixture: ComponentFixture<DialogDeleteDirectmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteDirectmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteDirectmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
