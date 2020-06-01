/**
 * Request
 */
import { Base64 } from 'js-base64';
import { Storage } from '@/utils/index';
import ENV from '@/config/env';

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(response.statusText);
  error.name = response.status;
  throw error;
}

export default async function Request(url: string, options: any) {
  url = ENV.api.test + url;

  options.headers = {
    Accept: 'application/json'
  };

  if (options.method === 'GET') {
    delete options.body;
  } else {
    options.headers['Content-Type'] = 'application/json; charset=utf-8';
    options.body = JSON.stringify(options.body);
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
