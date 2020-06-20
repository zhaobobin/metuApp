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

const IconNamecard: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M810.666667 234.666667a64 64 0 0 1 64 64v426.666666a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V298.666667a64 64 0 0 1 64-64h597.333334z m0 64H213.333333v426.666666h597.333334V298.666667z m-42.666667 298.666666v64H256v-64h512zM469.333333 341.333333v192H256v-192h213.333333z m298.666667 128v64H512v-64h256z m-362.666667-64h-85.333333v64h85.333333v-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconNamecard.defaultProps = {
  size: 18,
};

export default IconNamecard;
