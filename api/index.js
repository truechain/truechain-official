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


export {
  apiNodeRank,
  apiNodeSum,
  apiNodeRankPc,
  apiNodeTypeSumNum,
  apiArticleList
}
