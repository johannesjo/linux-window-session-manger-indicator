import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEntryComponent } from './session-entry.component';

describe('SessionEntryComponent', () => {
  let component: SessionEntryComponent;
  let fixture: ComponentFixture<SessionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
