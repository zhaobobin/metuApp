import ImagePicker from 'react-native-image-picker';
import { IImagePickerResponse } from '@/types/CommonTypes';

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
  return new Promise((reject, reslove) => {
    ImagePicker.showImagePicker(options, (response: IImagePickerResponse) => {
      if (response.didCancel) {
        reslove('User cancelled image picker');
      } else if (response.error) {
        reslove(response.error);
      } else {
        // const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        reject(response);
      }
    });
  });
};
