'use strict'

import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
const that = Vue.prototype
import {
  articleUrl,
  lightWalletUrl
} from '../config/index.js'

axios.interceptors.request.use(req => {
  that.$Spin.show()
  return req
}, err => {
  that.$Message.error(err)
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  that.$Spin.hide()
  return res
}, err => {
  that.$Message.error(err)
  return Promise.reject(err)
})

export default {
  post (url, data) {
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
    })
  },
  get (url, params = {}, isArticle = false) {
    return axios({
      method: 'get',
      baseURL: isArticle ? articleUrl : lightWalletUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiMHgzNDQ5ZWQzMDFlOGUyNzJmMmQzNzc0YzRiNjZhYTIzMDBmYmE5NmM4IiwibW9iaWxlIjoiMTc2MTEyMjM2NjUifQ.wfLydygUL2HcOctfRCTOfIwuJHZc5QEC0HHSm9WR-NE'
      }
    })
  }
}
