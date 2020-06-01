/**
 * https://github.com/entronad/crypto-es
 */
import CryptoES from 'crypto-es';

const cryptoKey = 'www.metuwang.com';
const cryptoIv = '1269571569321021';

/**
 * 加密方法
 * @param k
 * @param text
 * @returns {string}
 * @constructor
 */
export function Encrypt(k: string, text: string) {
  const DecryptKey = (k + cryptoKey).substring(0, 16);
  const key = CryptoES.enc.Utf8.parse(DecryptKey); // 十六位十六进制数作为密钥
  const iv = CryptoES.enc.Utf8.parse(cryptoIv); // 十六位十六进制数作为密钥偏移量

  const encrypted = CryptoES.AES.encrypt(text.toString(), key, {
    iv
  });
  return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param k
 * @param text
 * @returns {string}
 * @constructor
 */
export function Decrypt(k: string, text: string) {
  const DecryptKey = (k + cryptoKey).substring(0, 16);
  const key = CryptoES.enc.Utf8.parse(DecryptKey); // 十六位十六进制数作为密钥
  const iv = CryptoES.enc.Utf8.parse(cryptoIv); // 十六位十六进制数作为密钥偏移量

  const encryptedHexStr = CryptoES.enc.Hex.parse(text);
  const srcs = CryptoES.enc.Base64.stringify(encryptedHexStr);

  const decrypt = CryptoES.AES.decrypt(srcs, key, {
    iv
  });
  return decrypt.toString(CryptoES.enc.Utf8);
}
