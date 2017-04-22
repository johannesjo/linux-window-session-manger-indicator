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
  isLoading: Promise<any>;

  constructor(private windowSessionService: WindowSessionService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.isLoading = this.windowSessionService.getSessions()
      .then((sessions) => {
        this.sessions = sessions
      });
  }

  removeSession(sessionName: string): void {
    this.isLoading = this.windowSessionService.removeSession(sessionName)
      .then(() => {
        // reload sessions
        this.getSessions();
        console.log('SESSION REMOVED');
      });
  }

  saveNewSession(newSessionName: string): void {
    console.log(newSessionName);

    this.isLoading = this.saveCurrentSession(newSessionName)
      .then(() => {
        this.newSessionName = '';
      });
  }

  saveCurrentSession(sessionName: string): Promise<any> {
    console.log('CURRENT SAVE', sessionName);
    this.isLoading = this.windowSessionService.saveCurrentSessionTo(sessionName)
      .then(() => {
        // reload sessions
        this.getSessions();
        console.log('CURRENT SESSION SAVED');
      });

    return this.isLoading;
  }

  loadSession(session: WindowSession): Promise<any> {
    console.log('LOAD', session.name);
    this.isLoading = this.windowSessionService.loadSession(session.name)
      .then(() => {
        console.log('SESSION LOADED');
      });
    return this.isLoading;

  }
}
