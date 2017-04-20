class WindowData {
  windowId: string;
  windowIdDec: number;
  gravity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  wmClassName: string;
  executableFile: string;
  desktopFilePath?: string;
  states: any[];
}

class WindowsSessionForDisplay {
  id: string;
  windowList: [WindowData];
}

export class WindowSession {
  name: string;
  displaysCombinations: [WindowsSessionForDisplay];
}

