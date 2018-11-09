/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 12:48:57
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-09 11:14:51
* @flow
*/
const NAMES = require('../config/names.constants');

function getNumber(string, maxValue, radix) {
  let number = parseFloat(string, radix || 10);
  if (!isNaN(number)) {
    if (number <= maxValue) {
      return number;
    }
  }
  return null;
}

function getHexValues(inputString) {
  let findColor = null;
  let returnColors = [];
  let startIndex = inputString.indexOf("#");
  let index = startIndex;
  while (startIndex !== -1) {
    findColor= {
      id: index,
      type: "HEX",
      value: "#",
    }
    index += 1;
    while (!isNaN(parseInt(inputString[index], 16)) && index !== inputString.length) {
      findColor.value += inputString[index];
      index += 1;
    }
    if ([4,5,7,9].includes(findColor.value.length)) {
      if ([5,9].includes(findColor.value.length)) {
        findColor.type = "HEXA";
      }
      returnColors.push(findColor);
    };
    startIndex = inputString.indexOf('#', index);
    index = startIndex;
  }
  return returnColors;
}

function getFunctionalColor(inputString) {
  let returnColors = [];
  let index = 0;
  let start, end, type, value, partValues;
  //Find brackets
  if (isNaN(inputString.indexOf("("))) {
    return returnColors;
  }
  while (true) {
    start = inputString.indexOf("(", index);
    end = inputString.indexOf(")", index);
    if (start === -1 || end === -1) {
      break;
    } else {
      //Analize type
      if (inputString[start-1] === "A") {
        type = inputString.substring(start-4, start);
      } else {
        type = inputString.substring(start-3, start);
      }
      if (type === "RGBA" || type === "HSLA" || type === "RGB" || type === "HSL") {
        //Analize value
        value = inputString.substring(start + 1, end + 1)
        //PartValues count
        partValues = value.match(/((?:0\.|)\d+([,%)]+))/g);
        //Analize partValue
        if (partValues && partValues.join('') === value) {
          if (type === "RGB" && partValues.length === 3) {
            value = {
              r: getNumber(partValues[0].match(/(\d+(?=,))/g), 255),
              g: getNumber(partValues[1].match(/(\d+(?=,))/g), 255),
              b: getNumber(partValues[2].match(/(\d+(?=\)))/g), 255),
            }
          } else if (type === "RGBA" && partValues.length === 4) {
            value = {
              r: getNumber(partValues[0].match(/(\d+(?=,))/g), 255),
              g: getNumber(partValues[1].match(/(\d+(?=,))/g), 255),
              b: getNumber(partValues[2].match(/(\d+(?=,))/g), 255),
              a: getNumber(partValues[3].match(/((?:0.|)\d+(?=\)))/g), 1),
            }
          } else if (type === "HSL" && partValues.length === 3) {
            value = {
              h: getNumber(partValues[0].match(/(\d+(?=,))/g), 360),
              s: getNumber(partValues[1].match(/(\d+(?=\%,))/g), 100),
              l: getNumber(partValues[2].match(/(\d+(?=\%\)))/g), 100),
            }
          } else if (type === "HSLA" && partValues.length === 4) {
            value = {
              h: getNumber(partValues[0].match(/(\d+(?=,))/g), 360),
              s: getNumber(partValues[1].match(/(\d+(?=\%,))/g), 100),
              l: getNumber(partValues[2].match(/(\d+(?=\%,))/g), 100),
              a: getNumber(partValues[3].match(/((?:0.|)\d+(?=\)))/g), 1),
            }
          }
          if (typeof value !== "string" && Object.values(value).filter(el => el === null).length === 0) {
            returnColors.push({
              id: start, 
              type,
              value,
            });
          }
        }
      }
      index = end + 1;      
    } 
  }
  return returnColors;
}

function convertHexHexa(value) {
  if (value.length === 4) {
    return value + "F";
  } else if (value.length === 7) {
    return value + "FF";
  } else if (value.length === 5) {
    return value.substr(0, 4);
  } else if (value.length === 9) {
    return value.substr(0, 7);
  }
}

function convertHexAToRgbA(value, alphaFrom, alphaTo) {
  if ([5,9].includes(value.length) && !alphaFrom) {
    value = convertHexHexa(value);
  }
  if (value.length === 4) {
    value = "#" + value[1].repeat(2) + value[2].repeat(2) + value[3].repeat(2);
  } 
  if (value.length === 5) {
    value = "#" + value[1].repeat(2) + value[2].repeat(2) + value[3].repeat(2) + value[4].repeat(2);
  } 
  let result = {
    r: parseInt(value.substring(1, 3), 16),
    g: parseInt(value.substring(3, 5), 16),
    b: parseInt(value.substring(5, 7), 16),
  }
  if (alphaFrom) {
    if (alphaTo) {
      Object.assign( result, {
        a: parseInt(value.substring(7, 9), 16) / 255,
      });
    }
  } else {
    if (alphaTo) {
      Object.assign( result, {
        a: 1,
      });
    }
  }
  return result;
}

function convertRgbAToHexA(value, alphaFrom, alphaTo) {
  const { r, g, b , a } = value;
  let result = '#' + Math.round(r).toString(16) + Math.round(g).toString(16) + Math.round(b).toString(16);
  if (alphaFrom) {
    if (alphaTo) {
      result += Math.round(a * 255).toString(16);
    }
  } else {
    if (alphaTo) {
      result += "FF";
    }
  }
  return result;
}

function convertRgbAToHslA(value, alphaFrom, alphaTo) {
  let { r, g, b, a } = value;
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);
  let h, s, l = (max + min) / 2;
  let d = max - min;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }
  let result = { 
    h: h * 360, 
    s: s * 100, 
    l: l * 100, 
  };

  if (alphaFrom) {
    if (alphaTo) {
      Object.assign( result, {
        a
      });
    }
  } else {
    if (alphaTo) {
      Object.assign( result, {
        a: 1
      });
    }
  }

  return result;
}

function convertHexAToHslA(value, alphaFrom, alphaTo) {
  let result = convertHexAToRgbA(value, alphaFrom, alphaTo);
  result = convertRgbAToHslA(result, alphaFrom, alphaTo);
  return result;
}

function convertHslAToRgbA(value, alphaFrom, alphaTo) {
  let r, g, b;
  let { h, s, l, a } = value;
    h /= 360;
    s /= 100;
    l /= 100;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  let result = { 
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
  
  if (alphaFrom) {
    if (alphaTo) {
      Object.assign( result, {
        a
      });
    }
  } else {
    if (alphaTo) {
      Object.assign( result, {
        a: 1
      });
    }
  }
  
  return result;
}

function convertHslAToHexA(value, alphaFrom, alphaTo) {
  let result = convertHslAToRgbA(value, alphaFrom, alphaTo);
  result = convertRgbAToHexA(result, alphaFrom, alphaTo);
  return result;
}

function convertHexToHsl255(valueHEX) {
  let { h, s, l } = convertHexAToHslA(valueHEX, false, false);
  h = h / 360 * 255;
  s = s / 100 * 255;
  l = l / 100 * 255;  
  return { h, s, l }; 
}

const color = {
  //return HEX RGB HSL Array
  getFromString: function (inputString) {
    inputString = inputString.toString().toUpperCase();
    //fixed situation with HEX end symbols
    inputString = inputString.replace(/[\s,\n][A,B,C,D,E,F]/g, " Z");
    inputString = [...inputString]
      .filter(el => el !== " ")
      .filter(el => el !== "\n");
    inputString = inputString && inputString.join("");
    return getHexValues(inputString).concat(getFunctionalColor(inputString));
  },
  convert: function (value, fromType, toType) {
    // Check the same types
    if (fromType === toType) {
      return value;
    }
    // FROM => HEX
    if (fromType === "HEX") {
      if (toType === "HEXA") {
        return convertHexHexa(value);
      } else if (toType === "RGB") {
        return convertHexAToRgbA(value, false, false);
      } else if (toType === "RGBA") {
        return convertHexAToRgbA(value, false, true);
      } else if (toType === "HSL") {
        return convertHexAToHslA(value, false, false);
      } else if (toType === "HSLA") {
        return convertHexAToHslA(value, false, true);
      } else { return null }
    // FROM => HEXA
    } else if (fromType === "HEXA") {
      if (toType === "HEX") {
        return convertHexHexa(value);
      } else if (toType === "RGB") {
        return convertHexAToRgbA(value, true, false);
      } else if (toType === "RGBA") {
        return convertHexAToRgbA(value, true, true);
      } else if (toType === "HSL") {
        return convertHexAToHslA(value, true, false);
      } else if (toType === "HSLA") {
        return convertHexAToHslA(value, true, true);
      } else { return null }
    // FROM => RGB
    } else if (fromType === "RGB") {
      if (toType === "HEX") {
        return convertRgbAToHexA(value, false, false);
      } else if (toType === "HEXA") {
        return convertRgbAToHexA(value, false, true);
      } else if (toType === "RGBA") {
        return Object.assign(value, { a: 1 });
      } else if (toType === "HSL") {
        return convertRgbAToHslA(value, false, false);
      } else if (toType === "HSLA") {
        return convertRgbAToHslA(value, false, true);
      } else { return null }
    // FROM => RGBA
    } else if (fromType === "RGBA") {
      if (toType === "HEX") {
        return convertRgbAToHexA(value, true, false);
      } else if (toType === "HEXA") {
        return convertRgbAToHexA(value, true, true);
      } else if (toType === "RGB") {
        delete value.a
        return value;
      } else if (toType === "HSL") {
        return convertRgbAToHslA(value, true, false);
      } else if (toType === "HSLA") {
        return convertRgbAToHslA(value, true, true);
      } else { return null }
    // FROM => HSL
    } else if (fromType === "HSL") {
      if (toType === "HEX") {
        return convertHslAToHexA(value, false, false);
      } else if (toType === "HEXA") {
        return convertHslAToHexA(value, false, true);
      } else if (toType === "RGB") {
        return convertHslAToRgbA(value, false, false);
      } else if (toType === "RGBA") {
        return convertHslAToRgbA(value, false, true);
      } else if (toType === "HSLA") {
        
      } else { return null }
    // FROM => HSLA
    } else if (fromType === "HSLA") {
      if (toType === "HEX") {
        return convertHslAToHexA(value, true, false);
      } else if (toType === "HEXA") {
        return convertHslAToHexA(value, true, true);
      } else if (toType === "RGB") {
        return convertHslAToRgbA(value, true, false);
      } else if (toType === "RGBA") {
        return convertHslAToRgbA(value, true, true);
      } else if (toType === "HSL") {
        
      } else { return null }      
    } else { return null }  
  },
  getName: function (valueHEX) {
    const { r, g, b } = convertHexAToRgbA(valueHEX, false, false);
    // console.log(r + " " + g + " " + b + " ")
    const { h, s, l } = convertHexToHsl255(valueHEX)
    // console.log(h + " " + s + " " + l + " ")
    //Normalize HEX value to 6 digits  
    if (valueHEX.length === 5) {
      valueHEX.substring(0,4);
    }
    if (valueHEX.length === 9) {
      valueHEX.substring(0,7);
    }
    if ([4,7].includes(valueHEX.length)) {
      if (valueHEX.length === 4){
        valueHEX = valueHEX.substring(0,1) + 
          valueHEX.substring(1,2).repeat(2) + 
          valueHEX.substring(2,3).repeat(2) +
          valueHEX.substring(3,4).repeat(2);
      }
      valueHEX = valueHEX.slice(1);
    }
    //Add rgb and hsl values
    const names = [...NAMES].map(element => {
      return {
        value: element[0],
        name: element[1],
        rgb: convertHexAToRgbA("#" + element[0], false, false),
        hsl: convertHexToHsl255("#" + element[0]),
      }
    })
    let findIndex = -1,
    rgbPowValue = 0, 
    hslPowValue = 0,
    controlValue = 0,
    delta = -1;
    let element;
    for (let index = 0; index < names.length; index++) {
      element = names[index];
      rgbPowValue = Math.pow(r - element.rgb.r, 2) + Math.pow(g - element.rgb.g, 2) + Math.pow(b - element.rgb.b, 2);
      hslPowValue = Math.pow(h - element.hsl.h, 2) + Math.pow(s - element.hsl.s, 2) + Math.pow(l - element.hsl.l, 2);
      controlValue = rgbPowValue + hslPowValue * 2;
      if (delta < 0 || delta > controlValue)
      {
        delta = controlValue;
        findIndex = index;
      }
    }
    return names[findIndex].name;
  }
};

module.exports = color;