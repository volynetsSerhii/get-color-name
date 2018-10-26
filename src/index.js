/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:16:28
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-26 10:41:27
* @flow
*/
const vscode = require('vscode');
const extensions = require('./extensions');

function activate(context) {
    const { registerCommand } = vscode.commands;
    const { push } = context.subscriptions;
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

    const subGetConfigured = registerCommand('extension.getConfigured', getConfigured);
    const subGetRGBhexdecimal = registerCommand('extension.getRGBhexdecimal', getRGBhexdecimal);
    const subGetRGBfunctional = registerCommand('extension.getRGBfunctional', getRGBfunctional);
    const subGetHSLfunctional = registerCommand('extension.getHSLfunctional', getHSLfunctional);
    const subConvertConfigured = registerCommand('extension.convertConfigured', convertConfigured);
    const subConvertRGBhexdecimal = registerCommand('extension.convertRGBhexdecimal', convertRGBhexdecimal);
    const subConvertRGBfunctional = registerCommand('extension.convertRGBfunctional', convertRGBfunctional);
    const subConvertHSLfunctional = registerCommand('extension.convertHSLfunctional', convertHSLfunctional);

    push(subGetConfigured);
    push(subGetRGBhexdecimal);
    push(subGetRGBfunctional);
    push(subGetHSLfunctional);
    push(subConvertConfigured);
    push(subConvertRGBhexdecimal);
    push(subConvertRGBfunctional);
    push(subConvertHSLfunctional);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;