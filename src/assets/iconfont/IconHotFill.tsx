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

const IconHotFill: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M448.533333 155.797333c67.968 53.098667 115.498667 104.618667 142.592 154.602667 25.664 47.36 35.968 95.808 30.912 145.344l-0.981333 8.256 5.034667-4.117333a143.829333 143.829333 0 0 0 40.533333-57.536l2.218667-6.122667 6.336-19.029333c67.776 46.037333 101.674667 124.010667 101.674666 233.898666 0 164.821333-144.426667 270.037333-263.125333 270.037334-118.72 0-253.866667-70.506667-275.733333-218.069334-21.845333-147.541333 68.757333-216.426667 130.474666-312.533333 41.173333-64.064 67.84-128.981333 80.064-194.730667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHotFill.defaultProps = {
  size: 18,
};

export default IconHotFill;
