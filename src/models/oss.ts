import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { ossApi } from '@/api/index';
import { ENV, Storage, FetchGet } from '@/utils/index';
import { Toast } from '@/components/index';

// AliyunOSS
import AliyunOSS from 'aliyun-oss-react-native';
const photoOrigin = 'http://photo.metuwang.com/';
const bucketName = 'metuwang';
const endPoint = 'oss-cn-qingdao.aliyuncs.com';
const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60
};

export interface IOssState {}

interface PhotoModel extends Model {
  namespace: string;
  state: IOssState;
  effects: {
    exif: Effect;
    upload: Effect;
  };
  reducers: {
    setState: Reducer<IOssState>;
  };
}

const photoModel: PhotoModel = {
  namespace: 'oss',

  state: {},

  effects: {
    // 源数据
    *exif({ payload, callback }, _) {
      const url = payload.url + '?x-oss-process=image/info';
      const exif = yield FetchGet(url);
      yield callback(exif);
    },

    // 上传
    *upload({ payload, callback }, { call }) {
      let ossTokenRes = yield Storage.get(ENV.storage.ossToken, 7200);
      if (!ossTokenRes) {
        ossTokenRes = yield call(ossApi.getOssToken);
        Storage.set(ENV.storage.ossToken, ossTokenRes);
      }
      if (ossTokenRes.code === 0) {
        const { SecurityToken, AccessKeyId, AccessKeySecret } = ossTokenRes.data.credentials;
        AliyunOSS.enableDevMode();
        AliyunOSS.initWithSecurityToken(
          SecurityToken,
          AccessKeyId,
          AccessKeySecret,
          endPoint,
          configuration
        );
        AliyunOSS.asyncUpload(
          bucketName,
          payload.key,
          payload.file
        )
          .then(() => {
            const url = photoOrigin + payload.key;
            callback(url);
          })
          .catch(() => {
            Toast.show('上传失败！');
          });
      } else {
        Toast.show(ossTokenRes.message);
      }
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default photoModel;
