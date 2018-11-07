/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:24:40
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-06 14:02:46
* @flow
*/
const { utils } = require('../utils/');

const getHSLfunctional = () => {
  const { source } = utils;
  let outValues = source.convertTo("HSL");
  source.set(outValues, "HSL", true);
};

module.exports = getHSLfunctional;