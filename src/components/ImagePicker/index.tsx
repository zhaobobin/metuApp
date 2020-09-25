/**
 * https://github.com/ivpusic/react-native-image-crop-picker
 */
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from '@/components/index';

type pickCallback = (image: any) => void;

export function pickAvatarImage(callback: pickCallback) {
  const BUTTONS = ['使用微信头像', '拍照上传', '选择相册', '取消'];
  ActionSheet.showActionSheetWithOptions(
    {
      title: '选择图片',
      options: BUTTONS,
      destructiveButtonIndex: 3
    },
    buttonIndex => {
      switch (buttonIndex) {
        case 0:
          break;
        case 1:
          openCamera()
            .then(image => {
              callback(image);
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case 2:
          selectAvatar()
            .then(image => {
              callback(image);
            })
            .catch(err => {
              console.log(err);
            });
          break;
        default:
          break;
      }
    }
  );
}

export function openCamera() {
  return new Promise((reslove, reject) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(image => {
        reslove(image);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function selectAvatar() {
  return new Promise((reslove, reject) => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    })
      .then(image => {
        reslove(image);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function selectBanner() {
  return new Promise((reslove, reject) => {
    ImagePicker.openPicker({
      width: 800,
      height: 400,
      cropping: true
    })
      .then(image => {
        reslove(image);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function selectPhotos() {
  return new Promise((reslove, reject) => {
    ImagePicker.openPicker({
      multiple: true
    })
      .then(images => {
        reslove(images);
      })
      .catch(err => {
        reject(err);
      });
  });
}
