import {Component, OnInit} from '@angular/core';
import {WindowSession} from '../window-session';
import {WindowSessionService} from '../window-session.service';
import {CfgService} from '../../cfg.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  providers: [WindowSessionService, CfgService]
})
export class SessionListComponent implements OnInit {
  sessions: WindowSession[];
  newSessionName: string;
  screenshotDir: string;
  isLoading: Promise<any>;


  constructor(private windowSessionService: WindowSessionService, private cfgService: CfgService) {
  }

  ngOnInit(): void {
    this.getSessions();
    this.getScreenshotDir();
  }

  getScreenshotDir(): void {
    this.cfgService.get()
      .then((res) => {
        this.screenshotDir = res && res.screenshotDir || '';
      });
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
