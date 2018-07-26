import http from './http.js'

const apiNodeRank = (options) => {
  return http.get('nodeRank', options)
}

const apiNodeSum = (options) => {
  return http.get('nodeSum', options)
}

const apiNodeRankPc = (options) => {
  return http.get('nodeRankPc', options)
}

const apiNodeTypeSumNum = (options) => {
  return http.get('nodeTypeSumNum', options)
}

const apiArticleList = (options) => {
  return http.get('articleList', options, true)
}

const apiArticleDetail = (options) => {
  return http.get('articleDetail', options, true)
}

const apiGetIpInfo = (options) => {
  return http.get('getIpInfo', options, true)
}

export {
  apiNodeRank,
  apiNodeSum,
  apiNodeRankPc,
  apiNodeTypeSumNum,
  apiArticleList,
  apiArticleDetail,
  apiGetIpInfo
}
