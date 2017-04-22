import {Injectable} from '@angular/core';
import {WindowSession} from './window-session';
import {WINDOW_SESSIONS} from './window-sessions-mock';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class WindowSessionService {
  constructor(private _electronService: ElectronService) {
  }

  loadSession(sessionName: string): Promise<any> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve({});
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('LOAD_SESSION', sessionName);
      this._electronService.ipcRenderer.once('LOAD_SESSION_SUCCESS', (res) => {
        resolve(res);
      });
      this._electronService.ipcRenderer.once('LOAD_SESSION_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }

  saveCurrentSessionTo(sessionName: string): Promise<any> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve({});
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('SAVE_CURRENT_SESSION', sessionName);
      this._electronService.ipcRenderer.once('SAVE_CURRENT_SESSION_SUCCESS', (res) => {
        resolve(res);
      });
      this._electronService.ipcRenderer.once('SAVE_CURRENT_SESSION_ERROR', (ev, error) => {
        reject(error);
      });
    });
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
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_SUCCESS', (ev, sessionData) => {
        resolve(sessionData);
      });
      this._electronService.ipcRenderer.once('GET_SESSION_DATA_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }

  saveSession(sessionData: WindowSession): Promise<any> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve({});
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('SAVE_SESSION_DATA', sessionData);
      this._electronService.ipcRenderer.once('SAVE_SESSION_DATA_SUCCESS', () => {
        resolve(sessionData);
      });
      this._electronService.ipcRenderer.once('SAVE_SESSION_DATA_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }

  removeSession(sessionName: string): Promise<any> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve({});
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('REMOVE_SESSION', sessionName);
      this._electronService.ipcRenderer.once('REMOVE_SESSION_SUCCESS', () => {
        resolve(sessionName);
      });
      this._electronService.ipcRenderer.once('REMOVE_SESSION_ERROR', (ev, error) => {
        reject(error);
      });
    });
  }
}
