/*
 * @Author: Volynets Serhii 
 * @Date: 2018-10-29 15:42:16 
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-29 15:42:54
 * @flow  
 */

const vscode = require('vscode');
const extensions = require('./extensions');

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