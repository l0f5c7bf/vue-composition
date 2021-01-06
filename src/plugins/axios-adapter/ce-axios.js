import axios from 'axios'
import { compile, parse } from './utils/path'

/**
 * 简单封装axios
 */
export default class {
  constructor(axiosConfig, APIConfig) {
    this.APIConfig = APIConfig
    this.cachedRequests = {}
    this.axios = axios.create(axiosConfig)
  }

  loader(key) {
    if ('string' === typeof key) {
      key = key.split('.')
    }
    let o = this.APIConfig
    const API = key.pop()
    key.forEach(v => {
      o = o[v]
    })
    return {
      moduleConfig: o.default,
      APIConfig: o[API]
    }
  }


  cache(config) {
    const key = `${JSON.stringify(config)}`
    return this.cachedRequests[key]
      ? this.cachedRequests[key]
      : (this.cachedRequests[key] = this.axios.request(config))
  }

  getParamsType({ method }) {
    return Object.is(method) || !'POST,PUT,PATCH'.includes(method.toUpperCase())
      ? 'params'
      : 'data'
  }

  tryFixURL({ url, baseURL }) {
    url = url.trim()
    if (!url.startsWith('/')) url = `/${url}`
    return baseURL ? {
      baseURL: baseURL.trim().replace(/\/$/, ''),
      url
    } : { url }
  }

  parseParams(config, params) {
    let { baseURL, url } = this.tryFixURL(config)
    const parsedURL = parse(url)
    if (parsedURL.length > 1) {
      params = Object.assign({}, params)
      url = compile(url)(params)
      parsedURL.forEach(v => {
        v && v.name && delete params[v.name]
      })
    }
    return baseURL ?
      {
        [this.getParamsType(config)]: params,
        baseURL,
        url
      } :
      {
        [this.getParamsType(config)]: params,
        url
      }
  }


  send(config, params) {
    config = { ...config, ...this.parseParams(config, params) }
    return config.cache ? this.cache(config) : this.axios.request(config)
  }

  /**
   * 页面发起请求
   * @param {String} key 用来查找API配置的key
   * @param {Object} params 要发送的数据参数
   */

  request(key, params = {}, requestConfig) {
    try {
      const { moduleConfig, APIConfig } = this.loader(key)
      // 合并策略权重  全局配置 < 模块配置 < API配置 < 请求配置
      const config = Object.assign({}, moduleConfig, APIConfig, requestConfig)

      return this.send(config, params)
    } catch (err) {
      /**
       * 这里可以进行异常捕获
       * 如果适配器处理不了，则认为是原始的axios请求，直接调用axios实例
       * 这里拦截器和全局配置还在，如果需要使用新的实例调用this.$axios
       */

      if (process.env.NODE_ENV !== 'production') {
        console.error(err)
      }

      return this.axios.request(...arguments)
    }
  }
  /**
   *
   * @param {Object} interceptors  {response:Array,request:Array}
   */
  use(interceptors) {
    for (let i in interceptors) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        interceptors.hasOwnProperty(i) &&
        (i === 'response' || i === 'request')
      ) {
        const axiosInterceptors = this.axios.interceptors[i]
        const interceptor = interceptors[i]
        axiosInterceptors.use.apply(axiosInterceptors, interceptor)
      }
    }
  }
}
