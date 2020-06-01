/**
 * Request
 * get: Request('/carsouel', { method: 'get', params: {} })
 * other: Request('/user/{id}/update', { method: 'post', body: {} })
 */
import { Base64 } from 'js-base64';
import Storage from '@/utils/Storage';
import ENV from '@/config/env';

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface IOptions {
  method: RequestMethod;
  headers?: Record<string | number | symbol, any>;
  params?: Record<string | number | symbol, any>;
  body?: Record<string | number | symbol, any> | string;
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(response.statusText);
  error.name = response.status;
  throw error;
}

export default async function Request(url: string, options: IOptions) {
  // base_url
  url = ENV.api.test + url;

  options.headers = {
    Accept: 'application/json'
  };

  if (options.params) {
    if (options.method === 'get') {
      let query = '';
      for (let i in options.params) {
        query += i + '=' + options.params[i] + '&';
      }
      query = query.substring(0, query.length - 1);
      if (query) url = `${url}?${query}`;
    } else {
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
      options.body = JSON.stringify(options.params);
    }
    delete options.params;
  }

  // HttpBasicAuth
  const token = await Storage.get(ENV.storage.token);
  if (token) {
    options.headers['Authorization'] = 'Basic ' + Base64.encode(token + ':'); //读取本地token
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => {
      return error;
    });
}
