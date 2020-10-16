import React from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { selectPhotos } from '@/components/ImagePicker';
import { GlobalStyles } from '@/theme/index';
import Icon from '@/assets/iconfont';

export const parentWidth = GlobalStyles.screenWidth - 20;
export const itemWidth = parentWidth / 3;
export const itemHeight = itemWidth;

interface IPhotoPickerProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  callback: (images: any) => void;
}

const PhotoPicker: React.FC<IPhotoPickerProps> = props => {
  const { width, height, callback } = props;
  const onPress = async () => {
    const images = await selectPhotos();
    callback(images);
  };
  const viewStyle = {
    width,
    height
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, viewStyle]}>
        <Icon name="icon-add-select" size={60} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  }
});

export default PhotoPicker;
