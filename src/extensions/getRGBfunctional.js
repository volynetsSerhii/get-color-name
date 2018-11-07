/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:24:03
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-06 14:02:49
* @flow
*/
const { utils } = require('../utils/');

const getRGBfunctional = () => {
  const { source } = utils;
  let outValues = source.convertTo("RGB");
  source.set(outValues, "RGB", true);
};

module.exports = getRGBfunctional;