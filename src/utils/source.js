/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 10:15:38
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-30 11:18:28
* @flow
*/
const clipboard = require('copy-paste');
const vscode = require('vscode');
const color = require('./color');
const selection = require('./selection')

const source = {
  get: () => {
    const sourceAdvantage = vscode.workspace.getConfiguration("gnc").get("input.source");
    const clipboardValue = clipboard.paste();
    const selectionValue = selection.getText()
    // Choose what source will be first analize and which will be the second.
    let returnValue = [];
    if (sourceAdvantage === "Selection") {
      returnValue = color.getFromString(selectionValue);
      if (returnValue.length === 0) {
        returnValue = color.getFromString(clipboardValue);
      }
    } else if (sourceAdvantage === "Clipboard") {
      returnValue = color.getFromString(clipboardValue);
      if (returnValue.length === 0) {
        returnValue = color.getFromString(selectionValue);
      }
    }
    return returnValue;
  }
};

module.exports = source;