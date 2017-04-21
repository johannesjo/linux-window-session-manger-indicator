import {Injectable} from '@angular/core';
import {WindowSession} from './window-session';
import {WINDOW_SESSIONS} from './window-sessions-mock';


@Injectable()
export class WindowSessionService {
  getSessions(): Promise<WindowSession[]> {
    return Promise.resolve(WINDOW_SESSIONS)
  }
}
