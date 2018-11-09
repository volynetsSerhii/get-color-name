/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 14:01:54
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-09 10:54:57
* @flow
*/
const vscode = require('vscode');

const selection = {
  getText: () => {
    const editor = vscode.window.activeTextEditor;
    const selectionRange = new vscode.Range(editor.selection.start, editor.selection.end);
    return editor.document.getText(selectionRange);
  },
  get: () => {
    const editor = vscode.window.activeTextEditor;
    return editor.selection;
  },
  getEditor: () => {
    const editor = vscode.window.activeTextEditor;
    return editor;
  }
};

module.exports = selection;