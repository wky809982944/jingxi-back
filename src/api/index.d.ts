import { RequestConfig, RequestFunctionRestArgs } from 'yapi-to-typescript';
import request from '../utils/request';
export declare type Request<TReqeustData, TRequestConfig extends RequestConfig, TRequestResult> = (TRequestConfig['requestDataOptional'] extends true ? (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult : (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
    requestConfig: TRequestConfig;
};
/**
 * 接口 [getAllCate↗](http://yapi.wangkaiyi.com/project/11/interface/api/153) 的 **请求类型**
 *
 * @分类 [category-controller↗](http://yapi.wangkaiyi.com/project/11/interface/api/cat_398)
 * @标签 `category-controller`
 * @请求头 `POST /cate/getAllCate`
 * @更新时间 `2021-04-13 21:40:01`
 */
export interface GetAllCateRequest {
}
/**
 * 接口 [getAllCate↗](http://yapi.wangkaiyi.com/project/11/interface/api/153) 的 **返回类型**
 *
 * @分类 [category-controller↗](http://yapi.wangkaiyi.com/project/11/interface/api/cat_398)
 * @标签 `category-controller`
 * @请求头 `POST /cate/getAllCate`
 * @更新时间 `2021-04-13 21:40:01`
 */
export declare type GetAllCateResponse = {
    createTime?: string;
    id?: number;
    list?: {}[];
    name?: string;
    pid?: number;
    updateTime?: string;
}[];
/**
 * 接口 [getAllCate↗](http://yapi.wangkaiyi.com/project/11/interface/api/153) 的 **请求函数**
 *
 * @分类 [category-controller↗](http://yapi.wangkaiyi.com/project/11/interface/api/cat_398)
 * @标签 `category-controller`
 * @请求头 `POST /cate/getAllCate`
 * @更新时间 `2021-04-13 21:40:01`
 */
export declare const getAllCate: {
    (requestData?: GetAllCateRequest, ...args: any): any;
    requestConfig: any;
} | {
    (requestData: GetAllCateRequest, ...args: any): any;
    requestConfig: any;
};
