import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { parseAccountTokenOfUrl } from "./token";
import { ElNotification } from "element-plus";
interface RequestConfig extends AxiosRequestConfig {
  // 是否显示全局loading
  showGlobalLoading?: boolean;
  // 是否显示全局错误信息
  showGlobalErrorMessage?: boolean;
  // 是否返回原始数据
  responseAllData?: boolean;
}

export class Request {
  // 实例化axios
  instance: AxiosInstance;
  baseConfig: RequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    showGlobalLoading: false,
    showGlobalErrorMessage: true,
    responseAllData: false
  };
  constructor(config: RequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // token
        const token = parseAccountTokenOfUrl();
        if (token) {
          config.headers!.Accesstoken = token;
        }
        return config;
      },
      error => {
        // 全局错误提示
        if (config.showGlobalErrorMessage) {
          ElNotification({
            title: "服务器异常",
            message: error.message || "服务器异常",
            type: "error"
          });
        }
        return Promise.reject(error);
      }
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        if (data.code === "0") {
          if (config.responseAllData) {
            return data;
          } else {
            return data.data;
          }
        } else {
          // 全局错误提示
          if (config.showGlobalErrorMessage) {
            ElNotification({
              title: "服务器异常",
              message: data.message || "服务器异常",
              type: "error"
            });
          }
          return Promise.reject(data);
        }
      },
      error => {
        // 全局错误提示
        if (config.showGlobalErrorMessage) {
          ElNotification({
            title: "服务器异常",
            message: error.message || "服务器异常",
            type: "error"
          });
        }
        return Promise.reject(error);
      }
    );
  }
  // 自定义请求方法
  public request(config: RequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
  // get请求
  public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }
  // post请求
  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }
  // delete请求
  public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

export default new Request({});
