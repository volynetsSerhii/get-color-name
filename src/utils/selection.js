/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 14:01:54
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-08 15:33:23
* @flow
*/
const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

const selection = {
  getText: () => {
    const selectionRange = new vscode.Range(editor.selection.start, editor.selection.end);
    return editor.document.getText(selectionRange);
  },
  get: () => {
    return editor.selection;
  },
  getEditor: () => {
    return editor;
  }
};

module.exports = selection;