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

const IconScanning: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M234.666667 640v149.333333h159.978666v64H234.666667a64 64 0 0 1-64-64v-149.333333h64z m618.666666 0v149.333333a64 64 0 0 1-64 64h-160.021333v-64H789.333333v-149.333333h64z m-85.333333-160v64H256v-64h512zM789.333333 170.666667a64 64 0 0 1 64 64v149.333333h-64v-149.333333h-160V170.666667H789.333333zM394.666667 170.666667v64H234.666667v149.333333H170.666667v-149.333333a64 64 0 0 1 64-64h160z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconScanning.defaultProps = {
  size: 18,
};

export default IconScanning;
