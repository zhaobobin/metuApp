import React from 'react';
import { Image, View } from 'react-native';
import Icon from '@/assets/iconfont';

interface AvatarProps {
  url?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = props => {
  const { url, size } = props;
  const borderRadius = size ? size / 2 : 25;
  const styles = {
    width: size,
    height: size,
    borderRadius,
    backgroundColor: '#ccc'
  };
  const iconView = {
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <>
      {url ? (
        <Image
          source={{
            uri: `${url}?v=${Math.random()}`
          }}
          style={styles}
        />
      ) : (
        <View style={[styles, iconView]}>
          <Icon name="icon-account" size={borderRadius} color="#fff" />
        </View>
      )}
    </>
  );
};

Avatar.defaultProps = {
  size: 50
};

export default Avatar;
