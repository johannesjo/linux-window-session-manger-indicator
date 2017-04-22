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
  newSessionName: string;

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

  removeSession(sessionName: string): void {
    this.windowSessionService.removeSession(sessionName)
      .then(() => {
        // reload sessions
        this.getSessions();
        console.log('SESSION REMOVED');
      });
  }

  saveNewSession(newSessionName: string): void {
    console.log(newSessionName);

    this.saveCurrentSession(newSessionName)
      .then(() => {
        this.newSessionName = '';
      });
  }

  saveCurrentSession(sessionName: string): Promise<any> {
    console.log('CURRENT SAVE', sessionName);
    return this.windowSessionService.saveCurrentSessionTo(sessionName)
      .then(() => {
        // reload sessions
        this.getSessions();
        console.log('CURRENT SESSION SAVED');
      });
  }

  loadSession(session: WindowSession): Promise<any> {
    console.log('LOAD', session.name);
    return this.windowSessionService.loadSession(session.name)
      .then(() => {
        console.log('SESSION LOADED');
      });
  }
}
