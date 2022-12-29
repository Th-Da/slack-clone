import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CannelsComponent } from './cannels.component';

describe('CannelsComponent', () => {
  let component: CannelsComponent;
  let fixture: ComponentFixture<CannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
