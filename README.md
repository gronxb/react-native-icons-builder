# react-native-icons-builder

## Introduction
`react-native-icons-builder` is a CLI tool designed to generate React Native icons from the `react-icons` library.  
It uses SWC to transform the React Icons code into React Native components.  

https://react-icons.github.io/react-icons/

Check out the icons you want here and enter the following command:
```sh
> npx react-native-icons-builder@latest add AiFillApple
```

## Motivation

* **React Icons are not natively compatible with React Native:** React Icons is a popular library for web applications but doesn’t work out of the box with React Native. This tool provides a way to transform React Icons into React Native components, making them usable without unnecessary overhead.

* **Metro doesn’t support Tree Shaking effectively:** Metro, the bundler used in React Native, lacks efficient Tree Shaking capabilities. Therefore, bundling all of the React Icons together could lead to increased bundle sizes. This tool minimizes bundle size by allowing you to install only the icons you need directly into your project.

## Key Features

* Supports all icons available in the React Icons library.
* Designed with zero external dependencies (except for `react-native-svg`).
* No native code is involved, making it simple to integrate.

## Usage
* Basic
```sh
> npm install react-native-svg # or use pnpm or yarn
> npx react-native-icons-builder@latest add AiFillApple # visit https://react-icons.github.io/react-icons/
```

* Shorthand
```sh
> npm install react-native-svg react-native-icons-builder # or use pnpm or yarn
> npm run rn-icons add AiFillApple # visit https://react-icons.github.io/react-icons/
```


## Credit
This project is based on `react-icons`.  
https://github.com/react-icons/react-icons  
Thank you to `react-icons`.