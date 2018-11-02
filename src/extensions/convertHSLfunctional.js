/*
* @Author: Volynets Serhii
* @Date: 2018-10-25 17:20:11
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-02 11:47:57
* @flow
*/
const { utils } = require('../utils/');

const convertHSLfunctional = () => {
  const source = utils.source.get();
  if (source.length !== 0) {
    console.log(utils.color.convert(source[0].value, source[0].type, "HEX"))
  }
};

module.exports = convertHSLfunctional;