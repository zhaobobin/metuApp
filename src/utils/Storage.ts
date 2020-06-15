import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {
  /**
   * 保存
   * @param key
   * @param data
   */
  static set(key: string, data: any) {
    return AsyncStorage.setItem(
      key,
      JSON.stringify({ data, time: new Date().getTime() })
    );
  }

  static async get(key: string, exp?: number) {
    try {
      const storage = await AsyncStorage.getItem(key);
      if (!storage) {
        return
      };
      const res = JSON.parse(storage);
      // 过期
      if (exp && new Date().getTime() - res.time > exp * 1000) {
        return
      };
      return res.data;
    } catch (err) {
      err && console.log(err.toString());
    }
  }

  /**
   * 删除
   * @param key
   */
  static remove(key: string) {
    return AsyncStorage.removeItem(key);
  }

  /**
   * 清除
   * @returns {*|void|IDBRequest}
   */
  static clear() {
    return AsyncStorage.clear();
  }
}
