# react-native-icons-builder

## Introduction
`react-native-icons-builder` is a CLI tool designed to generate React Native icons from the React Icons library. It uses SWC to transform the React Icons code into React Native components.

https://react-icons.github.io/react-icons/

Check out the icons you want here and enter the following command:
```sh
> npx react-native-icons-builder add AiFillApple
```

## Motivation

React Icons are not natively compatible with React Native. Bundling all icons from React Icons into a React Native project can lead to larger bundle sizes since Metro doesn’t support Tree Shaking effectively. This tool provides an easy way to use React Icons within React Native without the risk of bloated bundle sizes.

## Key Features

* No additional dependencies are required, except for react-native-svg, which is commonly used in React Native.
* No native code is involved, making it simple to integrate.
* Supports all icons available in the React Icons library.

## Usage
* Basic
```sh
> npm install react-native-svg # or use pnpm or yarn
> npx react-native-icons-builder init
> npx react-native-icons-builder add AiFillApple # visit https://react-icons.github.io/react-icons/
```

* Shorthand
```sh
> npm install react-native-svg react-native-icons-builder # or use pnpm or yarn
> npm rn-icons init
> npx rn-icons add AiFillApple # visit https://react-icons.github.io/react-icons/
```


## Credit
This project is based on `react-icons`.
https://github.com/react-icons/react-icons
Thank you for `react-icons`.