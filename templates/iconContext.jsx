import React from "react";

export const DefaultContext = {
  color: undefined,
  size: undefined,
  style: undefined,
  attr: undefined,
};

export const IconContext = React.createContext(DefaultContext);
