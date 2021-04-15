/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */
/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */
// @ts-ignore
// prettier-ignore
import { Method, RequestBodyType, ResponseBodyType, prepare } from 'yapi-to-typescript';
// @ts-ignore
import request from '../utils/request';
// makeRequest
function makeRequestRequired(requestConfig) {
    const req = function (requestData, ...args) {
        return request(prepare(requestConfig, requestData), ...args);
    };
    req.requestConfig = requestConfig;
    return req;
}
function makeRequestOptional(requestConfig) {
    const req = function (requestData, ...args) {
        return request(prepare(requestConfig, requestData), ...args);
    };
    req.requestConfig = requestConfig;
    return req;
}
function makeRequest(requestConfig) {
    const optional = makeRequestOptional(requestConfig);
    const required = makeRequestRequired(requestConfig);
    return (requestConfig.requestDataOptional ? optional : required);
}
const mockUrl_0_0_0_0 = 'http://yapi.wangkaiyi.com/mock/11';
const devUrl_0_0_0_0 = '';
const prodUrl_0_0_0_0 = 'http://127.0.0.1:9000';
const dataKey_0_0_0_0 = 'data';
/**
 * 接口 [getAllCate↗](http://yapi.wangkaiyi.com/project/11/interface/api/153) 的 **请求配置**
 *
 * @分类 [category-controller↗](http://yapi.wangkaiyi.com/project/11/interface/api/cat_398)
 * @标签 `category-controller`
 * @请求头 `POST /cate/getAllCate`
 * @更新时间 `2021-04-13 21:40:01`
 */
const getAllCateRequestConfig = {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: '/cate/getAllCate',
    method: Method.POST,
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
};
/**
 * 接口 [getAllCate↗](http://yapi.wangkaiyi.com/project/11/interface/api/153) 的 **请求函数**
 *
 * @分类 [category-controller↗](http://yapi.wangkaiyi.com/project/11/interface/api/cat_398)
 * @标签 `category-controller`
 * @请求头 `POST /cate/getAllCate`
 * @更新时间 `2021-04-13 21:40:01`
 */
export const getAllCate = makeRequest(getAllCateRequestConfig);
/* prettier-ignore-end */
