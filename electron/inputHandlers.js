const { dialog } = require('electron');

module.exports = {
  desktopFilePath: (error, win, stdout) => {
    return new Promise((fulfill, reject) => {
      function askForVal(displayEntries) {
        // autosave first entry for now
        if (displayEntries && displayEntries[0]) {
          fulfill(displayEntries[0]);
        } else {
          reject();
        }
      }

      if (error) {
        if (stdout) {
          askForVal(stdout.split('\n'));
        } else {
          askForVal();
        }
      } else {
        const displayEntries = stdout.split('\n');
        let displayStr = '';
        for (let i = 0; i < displayEntries.length; i++) {
          if (displayEntries[i] !== '') {
            displayStr += `${i + 1}. ${displayEntries[i]} \n`;
          }
        }

        askForVal(displayEntries);
      }
    });
  }
};