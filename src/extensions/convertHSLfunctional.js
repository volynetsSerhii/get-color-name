/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:20:11
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-05 10:48:22
* @flow
*/
const { utils } = require('../utils/');

const convertHSLfunctional = () => {
  const { source } = utils;
  let outValues = source.convertTo("HSL");
  source.set(outValues, "HSL");
};

module.exports = convertHSLfunctional;