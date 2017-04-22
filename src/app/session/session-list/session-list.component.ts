import {Component, OnInit} from '@angular/core';
import {WindowSession} from '../window-session';
import {WindowSessionService} from '../window-session.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  providers: [WindowSessionService]
})
export class SessionListComponent implements OnInit {
  sessions: WindowSession[];

  constructor(private windowSessionService: WindowSessionService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.windowSessionService.getSessions()
      .then((sessions) => {
        this.sessions = sessions
      });
  }

  saveSession(session: WindowSession): void {
    console.log('SAVE', session);
    this.windowSessionService.saveSession(session)
      .then(() => {
        console.log('SESSION SAVED');
      });
  }

  loadSession(session: WindowSession): void {
    console.log('LOAD', session.name);
    this.windowSessionService.loadSession(session.name)
      .then(() => {
        console.log('SESSION LOADED');
      });
  }
}
