/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 18:26:20
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-05 11:35:02
* @flow
*/
const { utils } = require('../utils/');

const convertRGBfunctional = () => {
  const { source } = utils;
  let outValues = source.convertTo("RGB");
  source.set(outValues, "RGB");
};

module.exports = convertRGBfunctional;