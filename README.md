# 🎨 GET COLOR NAME 

##### This extension help find color name for value or convert one color format to another.

## ⌨️ KEYBOARD SHORTCUTS
###### You can use keyboard shortcuts for quick call command "Get Color Name: configured"
####
> ```"mac": "alt+cmd+v"```

> ```"windows": "alt+ctrl+v"```

> ```"linux": "alt+ctrl+v"```
## ⚡️ COMMANDS
#### For get colors pair value-key in some specific format please use one of below commands:
- ##### Get Color Name: configured
- ##### Get Color Name: RGBhexadecimal
- ##### Get Color Name: RGBfunctional
- ##### Get Color Name: HSLfunctional

![](https://raw.githubusercontent.com/volynetsSerhii/get-color-name/master/assets/demoGet.gif)

#### For convert values to some specific format please use one of below commands:
- ##### Convert Color Value: configured
- ##### Convert Color Value: RGBhexadecimal
- ##### Convert Color Value: RGBfunctional
- ##### Convert Color Value: HSLfunctional

![](https://raw.githubusercontent.com/volynetsSerhii/get-color-name/master/assets/demoConvert.gif)

## ⚙️ SETTINGS
#### Source
###### This setting determines the supremacy of the source. If the selected source has no color values, then the second one is analyzed.
####
```
"gcn.input.source": "Selection"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
>```"Selection"``` [default]

>```"Clipboard"```

![](https://raw.githubusercontent.com/volynetsSerhii/get-color-name/master/assets/demoSource.gif)

#### StatusBar controls vilible
###### This setting defines the visability of statusbar.
####
```
 "gcn.statusbar.support": true
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```false```

> ```true``` [default]

#### Name literal format
###### This setting defines the format of the color name literal.
####
```
 "gcn.nameFormat.literal": "camelCase"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"lowercase"```

> ```"camelCase"``` [default]

> ```"CapitalLetters"```

> ```"UPPERCASE"```

#### Name prefix
###### This setting defines the format of the color name prefix.
####
```
 "gcn.nameFormat.prefix": "None"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"None"``` [default]

> ```"--"``` 

> ```"@"```

> ```"$"```

#### Name separator
###### This setting defines the format of the color name words separator.
####
```
 "gcn.nameFormat.separator": "None"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"None"``` [default]

> ```"-"``` 

> ```"_"```

#### Assign symbol
###### This setting defines the assign symbol.
####
```
 "gcn.assign.symbol": ": "
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```": "``` [default]

> ```" = "``` 

> ```" := "```

#### Value format
###### This setting defines the color value format.
####
```
 "gcn.valueFormat.coding": "RGB hexadecimal"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"Don't convert"``` 

> ```"RGB hexadecimal"``` [default]

> ```"RGB functional"```

> ```"HSL functional"```

#### Ending symbol
###### This setting defines the ending symbol.
####
```
 "gcn.valueFormat.ending": ", Comma"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"None"```

> ```", Comma"``` [default]

> ```"; Semicolon"```

#### Quotes symbol
###### This setting defines the quotes symbol.
####
```
 "gcn.valueFormat.quotes": "\" Double quotes"
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```"None"``` [default]

> ```"\" Double quotes"``` 

> ```"' Single quotes"```

#### XML support
###### This setting defines the xml support.
####
```
  "gcn.xml.support": false
```
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Values
> ```false``` [default]

> ```true"``` 

![](https://raw.githubusercontent.com/volynetsSerhii/get-color-name/master/assets/demoXML.gif)

### 🎯 Contributing

Bugs, feature requests and more are welcome here [GitHubIssues](https://github.com/volynetsSerhii/get-color-name/issues).
