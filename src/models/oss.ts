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

export interface IOssState { }

interface PhotoModel extends Model {
  namespace: string;
  state: IOssState;
  effects: {
    exif: Effect;
    token: Effect;
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
    *exif({ payload }, _) {
      const url = payload.url + '?x-oss-process=image/info';
      const exif = yield FetchGet(url);
      return new Promise((reslove, reject) => {
        if (exif) {
          reslove(exif);
        } else {
          reject('error')
        }
      })
    },
    *token(_, { call }) {
      const ossTokenRes = yield call(ossApi.getOssToken);
      return new Promise((reslove, reject) => {
        if (ossTokenRes.code === 0) {
          Storage.set(ENV.storage.ossToken, ossTokenRes);
          reslove(ossTokenRes);
        } else {
          reject(ossTokenRes)
        }
      })
    },
    // 单个上传
    *upload({ payload }, _) {
      return new Promise((reslove, reject) => {
        const { SecurityToken, AccessKeyId, AccessKeySecret } = payload.ossToken.data.credentials;
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
            reslove(url);
          })
          .catch((error: any) => {
            Toast.show('上传失败！');
            console.log(error);
            reject(error);
          });
      })
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
