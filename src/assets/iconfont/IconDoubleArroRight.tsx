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

const IconDoubleArroRight: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M533.333333 233.386667l278.613334 278.485333L533.333333 790.613333l-45.248-45.226666 233.386667-233.514667-233.386667-233.258667L533.333333 233.386667z m-234.666666 0l278.613333 278.485333L298.666667 790.613333l-45.248-45.226666 233.386666-233.514667-233.386666-233.258667L298.666667 233.386667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDoubleArroRight.defaultProps = {
  size: 18,
};

export default IconDoubleArroRight;
