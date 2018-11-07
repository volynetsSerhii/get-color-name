/*
* @Author: Volynets Serhii
* @Date: 2018-10-26 10:15:38
 * @Last Modified by: Volynets Serhii
 * @Last Modified time: 2018-11-06 14:19:23
* @flow
*/
const clipboard = require('copy-paste');
const vscode = require('vscode');
const color = require('./color');
const selection = require('./selection')

function nameAplayFormat (name, format, separator) {
  if (separator === "None") {
    separator = "";
  }
  const nameAsArr = [...name].map(el => el === " " ? separator : el);
  switch (format) {
    case "lowercase": return nameAsArr
      .join("")
      .toLowerCase();
    case "camelCase": return nameAsArr
      .map((el,index) => index === 0 ? el.toLowerCase() : el)
      .join("");
    case "CapitalLetters": return nameAsArr
      .join("");
    case "UPPERCASE": return nameAsArr
      .join("")
      .toUpperCase();
    default: return name;
  }
}

const source = {
  get: function () {
    const sourceAdvantage = vscode.workspace.getConfiguration("gcn").get("input.source");
    const clipboardValue = clipboard.paste();
    const selectionValue = selection.getText();
    // Choose what source will be first analize and which will be the second.
    let returnValue = [];
    if (sourceAdvantage === "Selection") {
      returnValue = color.getFromString(selectionValue);
      if (returnValue.length === 0) {
        returnValue = color.getFromString(clipboardValue);
      }
    } else if (sourceAdvantage === "Clipboard") {
      returnValue = color.getFromString(clipboardValue);
      if (returnValue.length === 0) {
        returnValue = color.getFromString(selectionValue);
      }
    }
    return returnValue;
  },
  convertTo: function (type) {
    const source = this.get();
    const convertedValues = [];
    let name = "";
    if (source.length > 0) {
      source.forEach(element => {
        name = color.getName(color.convert(element.value, element.type, "HEX"));
        if (element.type === "HEXA" || element.type === "RGBA" || element.type === "HSLA") {
          convertedValues.push({type: type + "A", name, value: color.convert(element.value, element.type, type + "A")});
        } else if (element.type === "HEX" || element.type === "RGB" || element.type === "HSL") {
          convertedValues.push({type, name, value: color.convert(element.value, element.type, type)});
        }
      });
    }
    return convertedValues;
  },
  set: function (values, outType, withName) {
    const selectionValue = selection.get();
    const editor = selection.getEditor();
    const setupConfiguration = vscode.workspace.getConfiguration("gcn");
    values = values.map(element => {
      //XML
      if (setupConfiguration.get("xml.support") && withName) {
        if (element.type === "HEXA" || element.type === "RGBA" || element.type === "HSLA") {
          return `<color name=\"${nameAplayFormat(element.name, "CapitalLetters","")}\">${color.convert(element.value, element.type, "HEXA")}</color>`;
        } else if (element.type === "HEX" || element.type === "RGB" || element.type === "HSL") {
          return `<color name=\"${nameAplayFormat(element.name, "CapitalLetters","")}\">${color.convert(element.value, element.type, "HEX")}</color>`;
        }
      }

      //NAME
      let name = "";
      let value = "";
      if (withName) {
        name = setupConfiguration.get("nameFormat.prefix") !== "None" ? setupConfiguration.get("nameFormat.prefix") : "";
        name += nameAplayFormat(element.name, setupConfiguration.get("nameFormat.literal"), setupConfiguration.get("nameFormat.separator"));
        name += setupConfiguration.get("assign.symbol");
      }
      //HEX
      if (outType === "HEX") {
        value = element.value;
      }
      //RGB
      if (outType === "RGB") {
        value = `rgb${element.type === "RGBA" ? "a" : ""}(${
          Math.round(element.value.r)}, ${
          Math.round(element.value.g)}, ${
          Math.round(element.value.b)}${element.type === "RGBA" ? ", " + 
          Math.round(element.value.a * 100) / 100 : ""})`;
      }
      //HSL
      if (outType === "HSL") {
        value = `hsl${element.type === "HSLA" ? "a" : ""}(${
          Math.round(element.value.h)}, ${
          Math.round(element.value.s)}%, ${
          Math.round(element.value.l)}%${element.type === "HSLA" ? ", " + 
          Math.round(element.value.a * 100) / 100 : ""})`;
      }
      const quotes = setupConfiguration.get("valueFormat.quotes");
      if (quotes !== "None" && withName) {
        value = quotes[0] + value + quotes[0];
      }
      const ending = setupConfiguration.get("valueFormat.ending");
      if (quotes !== "None" && withName) {
        value = value + ending[0];
      }
      return withName ? name + value : value;
    })
    editor.edit(edit => edit.delete(selectionValue))
    .then( success => success && editor.edit(edit => edit.insert(selectionValue.start, values.join("\n"))));
  },
};

module.exports = source;