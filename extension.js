const vscode = require('vscode');
const ncp = require('copy-paste');
const ntc = require('./ntc').ntc;

function activate(context) {

    let disposable = vscode.commands.registerCommand('extension.convertName', function () {
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
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;