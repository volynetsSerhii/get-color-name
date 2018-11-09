/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:21:22
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-09 10:57:04
* @flow
*/
const { utils } = require('../utils/');
const workspace = require('vscode').workspace;

const getConfigured = () => {
  const { source } = utils;
  const valueFormat = workspace.getConfiguration("gcn").get("valueFormat.coding");
  const setupValues = [
    ["Don't convert", "HEX"],
    ["RGB hexadecimal", "HEX"],
    ["RGB functional", "RGB"],
    ["HSL functional", "HSL"],
  ]
  let outType = "HEX";
  setupValues.forEach(element => {
    if (element[0] === valueFormat) {
      outType = element[1];
    }
  });
  let outValues = source.convertTo(outType);
  source.set(outValues, outType, true);
}

module.exports = getConfigured;