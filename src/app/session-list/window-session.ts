class WindowData {
  windowId: string;
  windowIdDec: number;
  gravity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  executableFile: string;
  desktopFilePath?: string;
  states: any[];
  simpleName: string;
  wmClassName: string;
  wmTitle?: string;
  wmType?: string;
  wmPid: number;
  wmCurrentDesktopNr: number;
}

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

