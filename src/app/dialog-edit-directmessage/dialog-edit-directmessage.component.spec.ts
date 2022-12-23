import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDirectmessageComponent } from './dialog-edit-directmessage.component';

describe('DialogEditDirectmessageComponent', () => {
  let component: DialogEditDirectmessageComponent;
  let fixture: ComponentFixture<DialogEditDirectmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditDirectmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDirectmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
