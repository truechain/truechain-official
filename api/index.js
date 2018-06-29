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
  return http._get('articleList', options)
}

const apiArticleDetail = (options) => {
  return http._get('articleDetail', options)
}

const apiGetIpInfo = (options) => {
  return http._get('getIpInfo', options)
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
