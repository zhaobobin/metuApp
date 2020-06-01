/**
 * 过滤文字中的特殊符号
 * @param str
 * @returns {string}
 */
export function filterStr(str: string) {
  let pattern = new RegExp('[`~@#$^&|\\<>/~@#￥&]');
  let specialStr = '';
  for (let i = 0; i < str.length; i++) {
    specialStr += str.substr(i, 1).replace(pattern, '');
  }
  return specialStr;
}

/**
 *
 * @param str 过滤手机号
 */
export function filterTel(str: string) {
  return str.toString().replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
}

/**
 *
 * @param str 过滤银行卡号
 */
export function filterBankcard(str: string) {
  return str.substring(0, 4) + ' **** **** *' + str.substring(14, 16);
}
