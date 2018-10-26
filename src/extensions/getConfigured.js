/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:21:22
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-26 11:00:53
* @flow
*/
const vscode = require('vscode');
const ncp = require('copy-paste');
const ntc = require('../utils/ntc').ntc;

const getConfigured = () => {
  console.log("getConfigured");
  let editor = vscode.window.activeTextEditor;
  console.log(editor)
  let clipBoardValue = ncp.paste();
  console.log(clipBoardValue)
  if (!editor) {
      vscode.window.showInformationMessage('No open text editor!');
      return; 
  }
  editor.edit((e)=> {
      let selectionRange = new vscode.Range (editor.selection.start, editor.selection.end);
      ntc.init();
      let colorArray = ntc.name(clipBoardValue);
      let colorName = colorArray[2] === false ? "error" : colorArray[2];
      let pastingValue = colorName + ": \"" + colorArray[0]+"\",";
      e.delete(selectionRange);
      e.insert(editor.selection.active, pastingValue);
      editor.selection = new vscode.Selection(editor.selection.end, editor.selection.end);
  });
}

module.exports = getConfigured;