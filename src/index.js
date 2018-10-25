/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:16:28
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-25 18:33:12
* @flow
*/
const extensions = require('./extensions').extensions;
const vscode = require('vscode');
const ncp = require('copy-paste');
const ntc = require('./utils/ntc').ntc;

function activate(context) {

    let getConfigured = vscode.commands.registerCommand('extension.getConfigured', function () {
        let editor = vscode.window.activeTextEditor;
        let clipBoardValue = ncp.paste();
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
    });
    
    let getRGBhexdecimal = vscode.commands.registerCommand('extension.getRGBhexdecimal', function () {
        console.log('COOL');
        console.log(extensions)
        extensions.convertHSLfunctional();
    });
        
    let getRGBfunctional = vscode.commands.registerCommand('extension.getRGBfunctional', function () {

    });
        
    let getHSLfunctional = vscode.commands.registerCommand('extension.getHSLfunctional', function () {

    });
        
    let convertConfigured = vscode.commands.registerCommand('extension.convertConfigured', function () {

    });
        
    let convertRGBhexdecimal = vscode.commands.registerCommand('extension.convertRGBhexdecimal', function () {

    });
        
    let convertRGBfunctional = vscode.commands.registerCommand('extension.convertRGBfunctional', function () {

    });
        
    let convertHSLfunctional = vscode.commands.registerCommand('extension.convertHSLfunctional', function () {

    });

    context.subscriptions.push(getConfigured);
    context.subscriptions.push(getRGBhexdecimal);
    context.subscriptions.push(getRGBfunctional);
    context.subscriptions.push(getHSLfunctional);
    context.subscriptions.push(convertConfigured);
    context.subscriptions.push(convertRGBhexdecimal);
    context.subscriptions.push(convertRGBfunctional);
    context.subscriptions.push(convertHSLfunctional);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;