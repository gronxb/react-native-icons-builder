import React from "react";

import { Svg } from "react-native-svg";
import { DefaultContext, IconContext } from "./iconContext";

function Tree2Element(tree) {
  return tree?.map((node, i) =>
    React.createElement(
      node.tag,
      { key: i, ...node.attr },
      Tree2Element(node.child),
    ),
  );
}

export function GenIcon(data) {
  return (props) => (
    <IconBase attr={{ ...data.attr }} {...props}>
      {Tree2Element(data.child)}
    </IconBase>
  );
}

export function IconBase(props) {
  const elem = (conf) => {
    const { attr, size, ...svgProps } = props;
    const computedSize = size || conf.size || "1em";
    return (
      <Svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        {...conf.attr}
        {...attr}
        {...svgProps}
        style={[conf.style, props.style]}
        height={computedSize}
        width={computedSize}
      >
        {props.children}
      </Svg>
    );
  };

  return IconContext !== undefined ? (
    <IconContext.Consumer>{(conf) => elem(conf)}</IconContext.Consumer>
  ) : (
    elem(DefaultContext)
  );
}
