/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:16:23
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-25 18:29:01
* @flow
*/
const getConfigured = require('./getConfigured').getConfigured;
const getRGBhexdecimal = require('./getRGBhexdecimal').getRGBhexdecimal;
const getRGBfunctional = require('./getRGBfunctional').getRGBfunctional;
const getHSLfunctional = require('./getHSLfunctional').getHSLfunctional;
const convertConfigured = require('./convertConfigured').convertConfigured;
const convertRGBhexdecimal = require('./convertRGBhexdecimal').convertRGBhexdecimal;
const convertRGBfunctional = require('./convertRGBfunctional').convertRGBfunctional;
const convertHSLfunctional = require('./convertHSLfunctional').convertHSLfunctional;

exports.extensions = {
  getConfigured,
  getRGBhexdecimal,
  getRGBfunctional,
  getHSLfunctional,
  convertConfigured,
  convertRGBhexdecimal,
  convertRGBfunctional,
  convertHSLfunctional,
};