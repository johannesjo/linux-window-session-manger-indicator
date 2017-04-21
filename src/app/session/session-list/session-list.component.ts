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

  saveSession(sessionName: string): void {
    console.log('SAVE', sessionName);
    // this.windowSessionService.saveSession(sessionName)
    //   .then(() => {
    //   });
  }

  loadSession(sessionName: string): void {
    console.log('LOAD', sessionName);
    // this.windowSessionService.loadSession(sessionName)
    //   .then(() => {
    //   });
  }
}
