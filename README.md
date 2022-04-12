# car-keyboard

A Chinese vehicle plate number keyboard for React

React Hook + Antd 实现的车牌键盘。

## Description

- 基于Antd + React Hooks实现的车牌键盘，支持新能源规则。
- 省份 + 字母（无 I/O）/ 数字 + [港澳学警领]

## Installation
`npm i car-keyboard --save`

## Usage
```JavaScript
import CarNum from './CarKeyboard'

...

<CarNum 
  showCarKeyboard={showCarKeyboard} 
  setShowCarKeyboard={setShowCarKeyboard} 
  carNumber={carNumber} 
  setCarNumber={setCarNumber}
/>

```
