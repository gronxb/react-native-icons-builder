import * as React from "react";

import { Svg } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { DefaultContext, IconContext } from "./iconContext";

export interface IconTree {
  tag: React.ElementType;
  attr: { [key: string]: string };
  child: IconTree[];
}

function Tree2Element(tree: IconTree[]): React.ReactElement[] {
  return tree?.map((node, i) =>
    React.createElement(
      node.tag,
      { key: i, ...node.attr },
      Tree2Element(node.child)
    )
  );
}

export function GenIcon(data: IconTree) {
  return (props: IconBaseProps) => (
    <IconBase attr={{ ...data.attr }} {...props}>
      {Tree2Element(data.child)}
    </IconBase>
  );
}

export interface IconBaseProps extends SvgProps {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
}

export type IconType = (props: IconBaseProps) => JSX.Element;
export function IconBase(
  props: IconBaseProps & { attr?: Record<string, string> }
): JSX.Element {
  const elem = (conf: IconContext) => {
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
    <IconContext.Consumer>
      {(conf: IconContext) => elem(conf)}
    </IconContext.Consumer>
  ) : (
    elem(DefaultContext)
  );
}
