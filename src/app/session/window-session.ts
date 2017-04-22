import {WindowData} from './window-data';

class DisplayCombinations {
  id: string;
  windowList: [WindowData];
}

export class WindowSession {
  name: string;
  isCloseAppsWhenLoadingSession?: boolean;
  isCloseAppsWhenLoadingOtherDisplay?: boolean;
  displaysCombinations: [DisplayCombinations];
}

