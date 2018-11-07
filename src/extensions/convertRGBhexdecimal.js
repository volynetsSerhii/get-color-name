/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:25:46
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-05 11:35:25
* @flow
*/
const { utils } = require('../utils/');

const convertRGBhexdecimal = () => {
  const { source } = utils;
  let outValues = source.convertTo("HEX");
  source.set(outValues, "HEX");
};

module.exports = convertRGBhexdecimal;