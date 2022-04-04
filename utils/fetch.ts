import { baseUrl } from 'configs/options';
import FormData from 'form-data';

type HeaderDatas = Record<string, string>;

export enum Status {
  Error = -1,
  Success = 200,
  Timeout = 504,
};

interface StandardResponse {
  statusCode: Status;
  message: string | null;
  data: any;
  json?: Function;
}

const timeout = 30 * 1000; // 超时时间配置
export default async function ifetch(
  url: string = '',
  method: string = 'GET',
  data: any = {},
  headers: HeaderDatas = {}
): Promise<StandardResponse> {
  // method大写
  method = method.toUpperCase();

  let requestUrl = url;
  if (url.indexOf('https://') === -1) { // 区分站内外API地址
    // 站内API要拼接url
    if (url.slice(0, 1) === '/') requestUrl = `${baseUrl}${url.slice(1)}`;
    else requestUrl = baseUrl + url;
  }

  console.debug(`[fetch] target:${requestUrl}`);

  const headerData = Object.assign({
    Accept: "application/json",
    "Content-Type": "application/json",
    Charset: "utf-8",
  }, headers);

  if (data instanceof FormData) {
    delete headerData["Content-Type"];
  }

  const requestConfig = {
    // credientials: "include",
    method,
    headers: headerData,
    // mode: "cors",
  };

  if (method === "GET") {
    const keys = Object.keys(data);
    keys.forEach((key, index) => {
      requestUrl += `${!index ? '?' : '&'}${key}=${data[key]}`;
    });
  } else {
    Object.defineProperty(requestConfig, "body", {
      value: (data instanceof FormData) ? data : JSON.stringify(data),
    });
  }

  const timeoutFunc = (): Promise<StandardResponse> => new Promise(resolve => {
    setTimeout(() => resolve({
      statusCode: Status.Timeout,
      message: '请求超时',
      data: {},
    }), timeout);
  });

  const fetchFunc = (): Promise<StandardResponse | any> => fetch(requestUrl, requestConfig)
    .then(response => {
      return response.ok ? response : {
        statusCode: Status.Error,
        message: `请求错误: ${response.status}`,
        data: {},
      };
    })
    .catch(error => ({ statusCode: Status.Error, message: `Fail to fetch: ${error}`, data: {} }));

  const retJson = await Promise.race([fetchFunc(), timeoutFunc()])
    .then(response => {
      if (!response || typeof response.json !== 'function') {
        return { statusCode: Status.Error, message: 'Fetch Fail', data: {} };
      }
      return response.json();
    });

  return retJson;
}

