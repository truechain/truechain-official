'use strict'

import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

import {
  articleUrl,
  lightWalletUrl
} from '../config/index.js'

function checkStatus (response) {
  Vue.prototype.$Spin.hide();
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.data && res.data.status) {
    console.log(res.data.message)
  }
  return res
}

export default {
  post (url, data) {
    Vue.prototype.$Spin.show();
    return axios({
      method: 'post',
      baseURL: lightWalletUrl,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params = {}) {
    Vue.prototype.$Spin.show();
    return axios({
      method: 'get',
      baseURL: lightWalletUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHgzNDQ5ZWQzMDFlOGUyNzJmMmQzNzc0YzRiNjZhYTIzMDBmYmE5NmM4IiwibW9iaWxlIjoiMTc2MTEyMjM2NjUifQ.wfLydygUL2HcOctfRCTOfIwuJHZc5QEC0HHSm9WR-NE'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  _get (url, params = {}) {
    Vue.prototype.$Spin.show();
    return axios({
      method: 'get',
      baseURL: articleUrl,
      url,
      params,
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },

}
