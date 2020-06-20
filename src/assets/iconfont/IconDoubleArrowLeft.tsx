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

const IcondoubleArrowLeft: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M724.053333 233.386667l45.226667 45.248-233.365333 233.258666 233.386666 233.493334-45.269333 45.226666-278.613333-278.741333 278.613333-278.485333z m-234.666666 0l45.226666 45.248-233.365333 233.258666 233.386667 233.493334-45.269334 45.226666L210.773333 511.893333l278.613334-278.485333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IcondoubleArrowLeft.defaultProps = {
  size: 18,
};

export default IcondoubleArrowLeft;
