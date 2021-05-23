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
    const timeout = 30 * 1000;

    // method大写
    method = method.toUpperCase();

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

    const headerData = Object.assign({
        Accept: "application/json",
        "Content-Type": "application/json",
        Charset: "utf-8",
    }, headers);

    if (data instanceof FormData) {
        delete headerData["Content-Type"];
    }

    const requestConfig: RequestInit = {
        // credientials: "include",
        method,
        headers: headerData,
        // mode: "cors",
    };

    if (method === "GET") {
        let firstFlag = true;
        Object.keys(data).forEach((key) => {
            if (firstFlag) {
                url += "?";
                firstFlag = false;
            } else {
                url += "&";
            }
            url += `${key}=${data[key]}`;
        });
    } else {
        Object.defineProperty(requestConfig, "body", {
            value: data instanceof FormData ? data : JSON.stringify(data),
        });
    }


    const timeoutFunc = (): PromiseResponse => new Promise(resolve => {
        setTimeout(() => {
            resolve({"statusCode": 504, "message": "请求超时", "data": {}});
        }, timeout);
    });

    const fetchFunc = (): PromiseResponse => fetch(url, requestConfig)
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

    const retJson = await Promise.race([fetchFunc(), timeoutFunc()])
        .then(response => {
            if (!response || !(typeof response.json === "function")) {
                return {"statusCode": -1, "message": "Fetch Fail", "data": {}};
            }
            return response.json();
        });

    return retJson;
}
