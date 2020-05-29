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

const IconPassword: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512.704 106.666667a181.333333 181.333333 0 0 1 181.333333 181.333333l-0.021333 53.333333H789.333333a64 64 0 0 1 64 64v384a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h96.682666v-53.333333a181.333333 181.333333 0 0 1 181.333334-181.333333zM789.333333 405.333333H234.666667v384h554.666666V405.333333z m-239.210666 106.666667v170.666667h-64v-170.666667h64zM512.704 170.666667a117.333333 117.333333 0 0 0-117.333333 117.333333V341.333333h234.666666v-53.333333a117.333333 117.333333 0 0 0-117.333333-117.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPassword.defaultProps = {
  size: 18,
};

export default IconPassword;
