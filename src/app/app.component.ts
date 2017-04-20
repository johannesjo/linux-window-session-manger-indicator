import {Component} from '@angular/core';
import {WindowSessionService} from './window-session.service';
import {WindowSession} from './window-session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WindowSessionService]
})
export class AppComponent {
  title = 'app works!';
  sessions: WindowSession[];

  constructor(private windowSessionService: WindowSessionService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.windowSessionService.getSessions()
      .then((sessions) => {
        console.log(sessions);
        this.sessions = sessions
      });
  }
}

