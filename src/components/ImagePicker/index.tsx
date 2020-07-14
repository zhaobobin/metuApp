import React from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: '选择图片',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  cancelButtonTitle: '取消',
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default () => {
  return ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      console.log(source);
      return source;
    }
  });
};
