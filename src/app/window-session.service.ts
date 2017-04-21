import {Injectable} from '@angular/core';
import {WindowSession} from './window-session';
import {WINDOW_SESSIONS} from './window-sessions-mock';
import {ElectronService} from 'ngx-electron';


@Injectable()
export class WindowSessionService {
  constructor(private _electronService: ElectronService) {
  }

  getSessions(): Promise<WindowSession[]> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve(WINDOW_SESSIONS)
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('GET_SESSION_DATA');
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_READY', (ev, data) => {
        resolve(data);
      });
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }
}
