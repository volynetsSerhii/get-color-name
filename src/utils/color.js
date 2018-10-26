/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 12:48:57
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-10-26 14:21:30
* @flow
*/
const color = {
  //return HEX RGB HSL Array
  getFromString: (inputValue) => {
    //let inputString = inputValue.toString();
    let inputString = "sdrgb   (  15,  16,  23 )fg #456a56 sdasrgb (15,255,15 )4sd asd asd as da#000455asd asd a#sdf dsf sd#asd f".toUpperCase();
    inputString = [...inputString].filter(el => el !== " ");
    inputString = inputString.join("");
    let findColor = null;
    let findColors = [];
    //Finding HEX values in string
    let startIndex = inputString.indexOf("#");
    let index = startIndex;
    let buffer = null;
    while (startIndex !== -1) {
      findColor= {
        id: index,
        type: "hex",
        value: "#",
      }
      index += 1;
      while (!isNaN(parseInt(inputString[index], 16)) && index !== inputString.length) {
        findColor.value += inputString[index];
        index += 1;
      }
      if ([4,5,7,9].includes(findColor.value.length)) {
        findColors.push(findColor);
      };
      startIndex = inputString.indexOf('#', index);
      index = startIndex;
    }
    console.log(findColors)
    //Finding RGB values in string
    startIndex = inputString.indexOf("RGB(");
    index = startIndex;
    while (startIndex !== -1) {
      findColor= {
        id: index,
        type: "rgb",
        value: {
          r: null,
          g: null,
          b: null,
        },
      }
      index += 4;
      //find R
      buffer = parseInt(inputString.substring(index, inputString.indexOf(",", index)));
      if (inputString.indexOf(",", index) !== -1 &&  buffer >= 0 && buffer < 256) {
        findColor.value.r = buffer;
        index = inputString.indexOf(",", index) + 1;
      } else {
        startIndex = inputString.indexOf("RGB(", index);
        index = startIndex;
        break;
      };
      //find G
      buffer = parseInt(inputString.substring(index, inputString.indexOf(",", index)));
      if (inputString.indexOf(",", index) !== -1 &&  buffer >= 0 && buffer < 256) {
        findColor.value.g = buffer;
        index = inputString.indexOf(",", index) + 1;
      } else {
        startIndex = inputString.indexOf("RGB(", index);
        index = startIndex;
        break;
      };
      //find B
      buffer = parseInt(inputString.substring(index, inputString.indexOf(")", index)));
      if (inputString.indexOf(")", index) !== -1 &&  buffer >= 0 && buffer < 256) {
        findColor.value.b = buffer;
      } 
      startIndex = inputString.indexOf("RGB(", inputString.indexOf(")", index));
      index = startIndex;
      if (findColor.value.b !== null) {
        findColors.push(findColor);
      };
    }
    console.log(findColors)
  }
};

module.exports = color;