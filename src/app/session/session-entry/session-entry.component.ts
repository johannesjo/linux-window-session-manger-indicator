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
  isLoading: Promise<any>;

  constructor(private windowSessionService: WindowSessionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.subscribe(params => {
      this.sessionName = params['sessionName'];
      this.loadData(this.sessionName);
    });
    // this.isLoading = new Promise((fullfil, reject) => {
    //   console.log('LOADING');
    //   setTimeout(() => {
    //     console.log('NOT LOADING');
    //     fullfil({});
    //   }, 200000)
    // });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  loadData(sessionName: string): void {
    this.isLoading = this.windowSessionService.getSession(sessionName)
      .then((session) => {
        this.session = session;
      });
  }

  removeDisplayCombo(displayEntryId: string, displaysCombinations): void {
    const index = displaysCombinations.findIndex((entry) => entry.windowId === displayEntryId);
    displaysCombinations.splice(index, 1);
    this.saveSession();
  }

  removeEntry(entryId: string, windowList) {
    const index = windowList.findIndex((entry) => entry.windowId === entryId);
    windowList.splice(index, 1);
    this.saveSession();
  }

  saveEntry(entryId: string, windowList) {
    const entry = windowList.find((entry) => entry.windowId === entryId);
    console.log(entry);
    console.log('SAVE', entryId);
    this.saveSession();
  }

  saveSession(): void {
    this.isLoading = this.windowSessionService.saveSession(this.session)
      .then((res) => {
        console.log('SAVED', this.session, res);
      });
  }
}
