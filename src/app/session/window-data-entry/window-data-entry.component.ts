import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WindowData} from '../window-data';

@Component({
  selector: 'app-window-data-entry',
  templateUrl: './window-data-entry.component.html',
  styleUrls: ['./window-data-entry.component.scss']
})
export class WindowDataEntryComponent implements OnInit {
  @Input() windowData: WindowData;
  windowDataCopy: WindowData;
  @Output() saveEv: EventEmitter<string> = new EventEmitter();
  @Output() removeEv: EventEmitter<string> = new EventEmitter();
  WINDOW_DATA_KEYS = [
    'wmCurrentDesktopNr',
    'x',
    'y',
    'width',
    'height',
    'executableFile',
    'desktopFilePath',
    'gravity',
    'simpleName',
    'wmClassName',
    'states',
    'commandToExecuteAfterLaunch',
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.windowDataCopy = Object.assign({}, this.windowData);
  }

  remove(): void {
    this.removeEv.emit(this.windowData.windowId);
  }

  save(): void {
    // empty object
    for (let prop in this.windowData) {
      if (this.windowData.hasOwnProperty(prop)) {
        delete this.windowData[prop];
      }
    }

    // copy all props from copy
    for (let prop in this.windowDataCopy) {
      if (this.windowDataCopy.hasOwnProperty(prop)) {
        this.windowData[prop] = this.windowDataCopy[prop];
      }
    }

    this.saveEv.emit(this.windowData.windowId);
  }
}
