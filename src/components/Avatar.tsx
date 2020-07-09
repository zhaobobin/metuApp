import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface AvatarProps {
  url?: string;
  style?: ImageStyle;
}

const Avatar: React.FC<AvatarProps> = props => {
  return (
    <Image
      source={{
        uri: props.url
      }}
      style={[styles.avatar, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc'
  }
});

export default Avatar;
