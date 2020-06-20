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

const Iconcamera: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M810.667 256a64 64 0 0 1 64 64v426.667a64 64 0 0 1-64 64H213.333a64 64 0 0 1-64-64V320a64 64 0 0 1 64-64h597.334z m0 64H213.333v426.667h597.334V320zM512 384a149.333 149.333 0 1 1 0 298.667A149.333 149.333 0 0 1 512 384z m0 64a85.333 85.333 0 1 0 0 170.667A85.333 85.333 0 0 0 512 448z m298.667-298.667v64H512v-64h298.667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconcamera.defaultProps = {
  size: 18,
};

export default Iconcamera;
