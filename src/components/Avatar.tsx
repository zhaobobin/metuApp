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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc'
  }
});

export default Avatar;
