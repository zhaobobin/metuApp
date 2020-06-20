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

const IconMobilePhone: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M704 149.333333a64 64 0 0 1 64 64v597.333334a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V213.333333a64 64 0 0 1 64-64h384z m0 64H320v597.333334h384V213.333333z m-192 469.333334a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z m85.333333-437.333334v64h-170.666666v-64h170.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMobilePhone.defaultProps = {
  size: 18,
};

export default IconMobilePhone;
