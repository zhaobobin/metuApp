/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const IconHistory: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 160c194.410667 0 352 157.589333 352 352S706.410667 864 512 864l-2.538667-0.106667c-91.477333-7.274667-165.738667-38.08-221.44-91.989333L288 842.666667h-64V640H405.333333v64h-92.842666c46.250667 56.917333 112.490667 88.725333 200.768 96l6.677333-0.106667C675.328 795.690667 800 668.394667 800 512c0-159.061333-128.938667-288-288-288S224 352.938667 224 512h-64c0-194.410667 157.589333-352 352-352zM469.333333 320h64v160h160v64H469.333333V320z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHistory.defaultProps = {
  size: 18,
};

export default IconHistory;
