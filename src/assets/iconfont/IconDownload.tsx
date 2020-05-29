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

const IconDownload: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M704 341.333333h64a64 64 0 0 1 64 64v362.666667a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h64v64h-64v362.666667h512V405.333333h-64v-64z m-154.794667-212.266666l0.042667 347.456 74.005333-74.026667 45.226667 45.248-150.826667 150.848-150.848-150.826667 45.248-45.269333 73.173334 73.173333V129.066667h64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDownload.defaultProps = {
  size: 18,
};

export default IconDownload;
