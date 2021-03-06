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

const IconMove: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M545.28 618.666667v135.04l51.093333-49.578667 44.586667 45.909333-126.442667 122.752-128.682666-122.517333 44.117333-46.357333 51.349333 48.853333-0.021333-134.122667h64z m204.757333-235.626667l122.752 126.442667-122.517333 128.682666-46.357333-44.117333 48.853333-51.349333H618.666667v-64h135.04l-49.578667-51.072 45.909333-44.586667z m-476.202666 0l45.909333 44.586667-49.6 51.072H405.333333v64h-134.229333l48.853333 51.349333-46.336 44.117333-122.517333-128.682666 122.730667-126.442667zM514.517333 151.210667l126.442667 122.752-44.586667 45.909333-51.072-49.578667L545.28 405.333333h-64v-134.101333l-51.328 48.853333-44.117333-46.357333 128.682666-122.517333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMove.defaultProps = {
  size: 18,
};

export default IconMove;
