import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

export interface IconContext {
  color?: string;
  size?: string;
  style?: StyleProp<ViewStyle>;
  attr?: SvgProps;
}

export const DefaultContext: IconContext = {
  color: undefined,
  size: undefined,
  style: undefined,
  attr: undefined,
};

export const IconContext: React.Context<IconContext> =
  React.createContext(DefaultContext);
