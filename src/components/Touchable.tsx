/**
 * 自定义点击组件
 */
import React, { useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import _ from 'lodash';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(props => {
  const { onPress } = props;
  // 防双击
  let throttleOnPress = undefined;
  if (typeof onPress === 'function') {
    throttleOnPress = useCallback(
      _.throttle(onPress, 1000, { leading: true, trailing: false }),
      [onPress]
    );
  }
  return (
    <TouchableOpacity
      onPress={throttleOnPress}
      activeOpacity={props.activeOpacity || 0.8}
      {...props}
    />
  );
});

export default Touchable;
