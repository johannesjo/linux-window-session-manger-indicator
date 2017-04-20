import {Injectable} from '@angular/core';
import {WindowSession} from './window-session';

const WINDOW_SESSIONS: WindowSession[] = [{
  name: 'DEFAULT',
  displaysCombinations: [
    {
      "id": "3440x1440",
      "windowList": [
        {
          "windowId": "0x05800001",
          "windowIdDec": 92274689,
          "gravity": 0,
          "x": -21,
          "y": 52,
          "width": 1253,
          "height": 1388,
          "wmClassName": "google-chrome.Google-chrome",
          "executableFile": "google-chrome.desktop",
          "states": [
            "maximized_vert"
          ],
          "desktopFilePath": "/usr/share/applications/google-chrome.desktop"
        },
        {
          "windowId": "0x05400001",
          "windowIdDec": 88080385,
          "gravity": 0,
          "x": 63,
          "y": 1502,
          "width": 1867,
          "height": 1056,
          "wmClassName": "spotify.Spotify",
          "executableFile": "spotify.desktop",
          "states": [],
          "desktopFilePath": "/usr/local/share/applications/spotify.desktop"
        },
        {
          "windowId": "0x03400001",
          "windowIdDec": 54525953,
          "gravity": 0,
          "x": 2641,
          "y": 80,
          "width": 799,
          "height": 659,
          "wmClassName": "superproductivity.superProductivity",
          "executableFile": "superproductivity.desktop",
          "states": [],
          "desktopFilePath": "/home/johannes/.local/share/applications/appimagekit-superproductivity.desktop"
        },
        {
          "windowId": "0x06400006",
          "windowIdDec": 104857606,
          "gravity": 0,
          "x": 2634,
          "y": 770,
          "width": 806,
          "height": 666,
          "wmClassName": "gnome-terminal-server.Gnome-terminal",
          "executableFile": "gnome-terminal",
          "states": []
        },
        {
          "windowId": "0x05a00041",
          "windowIdDec": 94371905,
          "gravity": 0,
          "x": 1317,
          "y": 52,
          "width": 1290,
          "height": 1388,
          "wmClassName": "sun-awt-X11-XFramePeer.jetbrains-idea",
          "executableFile": "jetbrains-idea.desktop",
          "states": [
            "maximized_vert"
          ],
          "desktopFilePath": "/home/johannes/.gnome/apps/jetbrains-idea.desktop"
        },
        {
          "windowId": "0x05a007d8",
          "windowIdDec": 94373848,
          "gravity": 0,
          "x": 1323,
          "y": 52,
          "width": 1327,
          "height": 1388,
          "wmClassName": "sun-awt-X11-XFramePeer.jetbrains-idea",
          "executableFile": "jetbrains-idea.desktop",
          "states": [
            "maximized_vert"
          ],
          "desktopFilePath": "/home/johannes/.gnome/apps/jetbrains-idea.desktop"
        }
      ]
    }
  ]
}
];

@Injectable()
export class WindowSessionService {
  getSessions(): Promise<WindowSession[]> {
    return Promise.resolve(WINDOW_SESSIONS)
  }
}
