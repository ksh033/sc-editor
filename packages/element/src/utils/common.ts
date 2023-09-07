export const baseApi = '/api';

export const baseUrl = 'https://testepay.bstj.com/bg/img';

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
