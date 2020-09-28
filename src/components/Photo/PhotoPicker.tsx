import React from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { selectPhotos } from '@/components/ImagePicker';
import { screenWidth } from '@/utils/index';
import { color } from '@/theme/index';
import Icon from '@/assets/iconfont';

export const parentWidth = screenWidth - 20;
export const itemWidth = parentWidth / 3;
export const itemHeight = itemWidth;

interface IPhotoPickerProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
  callback: (images: any) => void;
}

const PhotoPicker: React.FC<IPhotoPickerProps> = props => {
  const { width, height } = props;
  const onPress = async () => {
    const images = await selectPhotos();
    console.log(images);
  };
  const viewStyle = {
    width,
    height
  };
  return (
    <View style={[styles.container, viewStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="icon-add-select" size={60} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    backgroundColor: '#f9f9f9'
  }
});

export default PhotoPicker;
