import { create } from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';
import Toast from '@/components/Toast';

// 1、创建dva实例
const app = create({
  onError() {
    Toast.show('网络异常');
  }
});
// 2、装载models对象
models.forEach(model => {
  app.model(model);
});
app.use(createLoading());
// 3、实例初始化
app.start();
// 4、导出store
const store = app._store;
export default store;
