/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 10:15:38
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-26 14:13:25
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
    let returnValue;
    if (sourceAdvantage === "Selection") {
      returnValue = color.getFromString(selectionValue);
    }
    //"Clipboard"
    return returnValue;
  }
};

module.exports = source;