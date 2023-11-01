export const baseApi = '/api';

export const baseUrl = 'https://test.yumcat.cn/images';

export function imageUrl(url: string) {
  const str = RegExp('http');
  let newUrl: string | null = null;
  // 通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去
  if (url) {
    if (str.test(url)) {
      newUrl = url;
    } else {
      if (url.substr(0, 1) !== '/') {
        url = `/${url}`;
      }
      newUrl = `${baseUrl}${url}`;
    }
  }

  return newUrl;
}

export function isPromise(obj: any) {
  return (
    !!obj && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
    (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
    typeof obj.then === 'function'
  );
}
