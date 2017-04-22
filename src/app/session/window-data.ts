export class WindowData {
  windowId: string;
  windowIdDec: number;
  gravity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  executableFile: string;
  desktopFilePath?: string;
  states: string[];
  simpleName: string;
  commandToExecuteAfterLaunch?: string;
  wmClassName: string;
  wmTitle?: string;
  wmType?: string;
  wmPid: number;
  wmCurrentDesktopNr: number;
}