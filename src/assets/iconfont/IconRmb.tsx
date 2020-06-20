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

const IconRmb: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M675.861333 192l45.610667 44.906667-166.997333 169.6h237.525333v64H544v144.597333h248v64H544v176.597333h-64v-176.597333H232v-64H480v-144.597333H232v-64h237.482667l-166.954667-169.6L348.138667 192 512 358.464 675.861333 192z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRmb.defaultProps = {
  size: 18,
};

export default IconRmb;
