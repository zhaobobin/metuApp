import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Icon from '@/assets/iconfont';

interface AvatarProps {
  url?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = props => {
  const { url, size } = props;
  const borderRadius = size ? size / 2 : 25;
  const style = {
    width: size,
    height: size,
    borderRadius,
    backgroundColor: '#ccc'
  };

  return (
    <>
      {url ? (
        <Image
          source={{
            uri: `${url}?v=${Math.random()}`
          }}
          style={style}
        />
      ) : (
        <View style={[style, styles.iconView]}>
          <Icon name="icon-account" size={borderRadius} color="#fff" />
        </View>
      )}
    </>
  );
};

Avatar.defaultProps = {
  size: 50
};

const styles = StyleSheet.create({
  iconView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Avatar;
