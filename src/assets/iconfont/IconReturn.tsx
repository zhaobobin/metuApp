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

const IconReturn: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M486.592 494.528l-45.226667 45.269333-171.989333-171.882666 171.946667-172.032 45.269333 45.226666-86.826667 86.869334h195.413334c122.88 0 222.826667 97.962667 226.069333 220.032l0.085333 6.122666c0 124.885333-101.248 226.133333-226.133333 226.133334H199.466667v-64H595.2a162.133333 162.133333 0 1 0 0-324.266667l-211.2-0.021333 102.592 102.549333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconReturn.defaultProps = {
  size: 18,
};

export default IconReturn;
