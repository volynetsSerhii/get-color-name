/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:16:23
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-26 10:47:20
* @flow
*/
const getConfigured = require('./getConfigured');
const getRGBhexdecimal = require('./getRGBhexdecimal');
const getRGBfunctional = require('./getRGBfunctional');
const getHSLfunctional = require('./getHSLfunctional');
const convertConfigured = require('./convertConfigured');
const convertRGBhexdecimal = require('./convertRGBhexdecimal');
const convertRGBfunctional = require('./convertRGBfunctional');
const convertHSLfunctional = require('./convertHSLfunctional');

const extensions = {
  getConfigured,
  getRGBhexdecimal,
  getRGBfunctional,
  getHSLfunctional,
  convertConfigured,
  convertRGBhexdecimal,
  convertRGBfunctional,
  convertHSLfunctional,
};

module.exports = extensions;