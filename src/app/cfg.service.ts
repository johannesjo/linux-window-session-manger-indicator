import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class CfgService {
  constructor(private _electronService: ElectronService) {
  }

  get(): Promise<any> {
    // send back mock for browser dev
    if (!this._electronService.ipcRenderer) {
      return Promise.resolve({});
    }

    return new Promise((resolve, reject) => {
      this._electronService.ipcRenderer.send('GET_CFG');
      this._electronService.ipcRenderer.once('GET_CFG_SUCCESS', (ev, res) => {
        if (res) {
          resolve(res);
        } else {
          reject(ev);
        }
      });
    });
  }
}
