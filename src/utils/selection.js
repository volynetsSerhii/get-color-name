/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 14:01:54
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-08 10:32:04
* @flow
*/
const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

const selection = {
  getText: () => {
    const selectionRange = editor && new vscode.Range(editor.selection.start, editor.selection.end);
    return editor && editor.document.getText(selectionRange);
  },
  get: () => {
    return editor && editor.selection;
  },
  getEditor: () => {
    return editor;
  }
};

module.exports = selection;