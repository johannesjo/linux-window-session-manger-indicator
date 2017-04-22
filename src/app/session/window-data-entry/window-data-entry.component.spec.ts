import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDataEntryComponent } from './window-data-entry.component';

describe('WindowDataEntryComponent', () => {
  let component: WindowDataEntryComponent;
  let fixture: ComponentFixture<WindowDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
