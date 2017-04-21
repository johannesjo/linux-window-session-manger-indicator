import {Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute} from '@angular/router';
import {WindowSession} from '../window-session';
import {WindowSessionService} from '../window-session.service';

@Component({
  selector: 'app-session-entry',
  templateUrl: './session-entry.component.html',
  styleUrls: ['./session-entry.component.scss'],
  providers: [WindowSessionService]
})
export class SessionEntryComponent implements OnInit, OnDestroy {
  private _subscription: any;
  session: WindowSession;
  sessionName: string;

  constructor(private windowSessionService: WindowSessionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.subscribe(params => {
      this.sessionName = params['sessionName'];
      this.loadData(this.sessionName);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  loadData(sessionName: string): void {
    this.windowSessionService.getSession(sessionName)
      .then((session) => {
        this.session = session
      });
  }
}
