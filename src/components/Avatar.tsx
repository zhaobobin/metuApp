import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { size } from 'lodash';

interface AvatarProps {
  url?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = props => {
  const { url, size } = props;

  const styles = {
    width: size,
    height: size,
    borderRadius: size ? size / 2 : 25,
    backgroundColor: '#ccc'
  }

  return (
    <Image
      source={{
        uri: `${url}?v=${Math.random()}`
      }}
      style={styles}
    />
  );
};

Avatar.defaultProps = {
  size: 50
}

export default Avatar;
