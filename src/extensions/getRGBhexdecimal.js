/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:22:55
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-06 09:18:42
* @flow
*/
const { utils } = require('../utils/');

const getRGBhexdecimal = () => {
  const { source } = utils;
  let outValues = source.convertTo("HEX");
  source.set(outValues, "HEX", true);
};

module.exports = getRGBhexdecimal;