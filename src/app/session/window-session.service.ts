import {Injectable} from '@angular/core';
import {WindowSession} from './window-session';
import {WINDOW_SESSIONS} from './window-sessions-mock';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class WindowSessionService {
  constructor(private _electronService: ElectronService) {
  }

  getSession(sessionName: string): Promise<WindowSession> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve(WINDOW_SESSIONS.find((entry) => entry.name === sessionName))
    }

    return new Promise((resolve, reject) => {
      this.getSessions()
        .then((sessionData) => {
          const entryToReturn = sessionData.find((entry) => entry.name === sessionName);
          console.log(entryToReturn, sessionName);

          resolve(entryToReturn);
        }, reject);
    });
  }

  getSessions(): Promise<WindowSession[]> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve(WINDOW_SESSIONS)
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('GET_SESSION_DATA');
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_READY', (ev, sessionData) => {
        resolve(sessionData);
      });
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }
}
