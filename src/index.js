/*
 * @Author: Volynets Serhii 
 * @Date: 2018-10-29 15:42:16 
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-08 11:43:25
 * @flow  
 */

const vscode = require('vscode');
const extensions = require('./extensions');
const { window, StatusBarAlignment } = vscode;
const { color, source } = require('./utils').utils;
 
function updateStatusBar (items) {
    // Get the current text editor
    const { statusBarColorPicker, statusBarColorCount } = items;
    let editor = window.activeTextEditor;
    if (!editor) {
        items && items.forEach(item => item.hide());
        return;
    }
    let doc = editor.document;
    let colorCount = color.getFromString(doc.getText()).length;
    // Only update status if a Markdown file
    if (colorCount > 0) {
        // Update the status bar
        const selectedColors = source.convertTo("HEX");
        let selectedValue = "# NONE ";
        if (selectedColors.length > 0) {
            selectedValue = selectedColors[0].value;
            if (selectedValue.length === 5) {
                selectedValue = selectedValue.slice(0,4);
            }
            if (selectedValue.length === 9) {
                selectedValue = selectedValue.slice(0,7);
            }
            if (selectedValue.length === 4) {
                selectedValue = "#" + selectedValue[1].repeat(2) + selectedValue[2].repeat(2) + selectedValue[3].repeat(2);
            }
            statusBarColorPicker.color = selectedValue;
            statusBarColorPicker.text = "░▒███▒░ ▶ " + selectedColors[0].value;
        } else {
            statusBarColorPicker.text = "░░░░░░░ ▶ " + selectedValue;
            statusBarColorPicker.color = "#AD65DF";
        }
        statusBarColorCount.text = colorCount !== 1 ? `$(paintcan) ${colorCount} Colors` : `$(paintcan) 1 Color`;
        statusBarColorCount.tooltip = `Find ${colorCount} color${colorCount !== 1 ? "s" : ""} in active text editor.`;
        statusBarColorCount.show();
    } else {
        statusBarColorCount.hide();
    }
};

function activate(context) {
    const { registerCommand } = vscode.commands;
    const { subscriptions } = context;
    const {
        getConfigured,
        getRGBhexdecimal,
        getRGBfunctional,
        getHSLfunctional,
        convertConfigured,
        convertRGBhexdecimal,
        convertRGBfunctional,
        convertHSLfunctional,
    } = extensions;
    //Creating color counter
    if (vscode.workspace.getConfiguration("gcn").get("statusbar.support")) {
        const statusBarColorPicker = window.createStatusBarItem(StatusBarAlignment.Left);
        statusBarColorPicker.show();
        const statusBarColorCount = window.createStatusBarItem(StatusBarAlignment.Left);
        statusBarColorCount.command = "extension.getConfigured";
        updateStatusBar({ statusBarColorPicker, statusBarColorCount });
        //First run color counter when activate
        window.onDidChangeTextEditorSelection(() => updateStatusBar({ statusBarColorPicker, statusBarColorCount }));
    }
    const subGetConfigured = registerCommand('extension.getConfigured', getConfigured);
    const subGetRGBhexdecimal = registerCommand('extension.getRGBhexdecimal', getRGBhexdecimal);
    const subGetRGBfunctional = registerCommand('extension.getRGBfunctional', getRGBfunctional);
    const subGetHSLfunctional = registerCommand('extension.getHSLfunctional', getHSLfunctional);
    const subConvertConfigured = registerCommand('extension.convertConfigured', convertConfigured);
    const subConvertRGBhexdecimal = registerCommand('extension.convertRGBhexdecimal', convertRGBhexdecimal);
    const subConvertRGBfunctional = registerCommand('extension.convertRGBfunctional', convertRGBfunctional);
    const subConvertHSLfunctional = registerCommand('extension.convertHSLfunctional', convertHSLfunctional);
    
    subscriptions.push(subGetConfigured);
    subscriptions.push(subGetRGBhexdecimal);
    subscriptions.push(subGetRGBfunctional);
    subscriptions.push(subGetHSLfunctional);
    subscriptions.push(subConvertConfigured);
    subscriptions.push(subConvertRGBhexdecimal);
    subscriptions.push(subConvertRGBfunctional);
    subscriptions.push(subConvertHSLfunctional);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;