import { baseUrl } from '../configs/options';
import fetch from "node-fetch";
import { RequestInit, Response } from "node-fetch/index";

interface HeaderDatas {
    [key: string]: string
}

interface StandardResponse {
    statusCode: number,
    message: string | null,
    data: any,
    json?: Function
}

type PromiseResponse = Promise<StandardResponse | any>;

export default async function ifetch(
    url: string = '',
    method: string = 'GET',
    data: any = {},
    headers: HeaderDatas = {}
): PromiseResponse {
    // 超时时间配置
    let timeout = 30 * 1000;

    // method大写
    method = method.toUpperCase();

    // headers处理
    let header_data: HeaderDatas = headers;
    header_data['Accept'] = 'application/json';
    header_data['Content-Type'] = 'application/json';
    header_data['Cache-Contorol'] = 'no-store';

    if(method==='FILE') {
        delete header_data['Content-Type'];
    }

    // 区分站内外API地址
    if(url.indexOf('https://') === -1) {
        // 站内API
        // URL拼接
        if (url.substr(0, 1) === '/') {
            url = baseUrl + url.substr(1);
        } else {
            url = baseUrl + url;
        }
    }

    console.log("fetch %s", url);

    // 信息请求
    let requestConfig: RequestInit = {
        // credentials: 'include',
        method: method === 'GET' ? 'GET' : 'POST',
        headers: header_data,
        // mode: "cors",
        // cache: "no-cache"
    };

    if (method === 'POST') {
        // 仅POST请求附带数据
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data)
        })
    } else if (method === 'GET') {
        let cnt = 0;
        Object.keys(data).forEach(val => {
            if(cnt===0) {
                url += "?";
            }else{
                url += "&";
            }
            url += val;
            url += "=";
            url += data[val];
            cnt++;
        });
    } else if (method === 'FILE') {
        Object.defineProperty(requestConfig, 'body', data)
    }


    let timeoutFunc = (): PromiseResponse => {
        return new Promise( resolve => {
            setTimeout( () => {
                resolve({"statusCode": 504, "message": "请求超时", "data": {}});
            }, timeout)
        })
    };

    let fetchFunc = (): PromiseResponse => {
        return fetch(url, requestConfig)
            .then(response => {
                let retResp: StandardResponse | Response;
                if(!response.ok) {
                    retResp = {"statusCode": -1, "message": "请求错误"+response.status, "data": {}};
                } else {
                    retResp = response;
                }
                return retResp;
            })
            .catch( error => {
                return {"statusCode": -1, "message": "Fail to fetch:"+error, "data": {}}
            });
    };

    const retJson = await Promise.race([fetchFunc(), timeoutFunc()])
        .then(response => {
            if (!response || !(typeof response.json === "function")) {
                return {"statusCode": -1, "message": "Fetch Fail", "data": {}};
            }
            return response.json();
        });

    return retJson;
}
